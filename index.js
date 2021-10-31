#!/usr/bin/env node
'use strict';
import axios from 'axios';
import { consume } from '@ii887522/hydro';
import constants from './src/constants.js';
import axiosRetry, { exponentialDelay } from 'axios-retry';
axiosRetry(axios, { retries: 16, retryDelay: exponentialDelay, retryCondition: error => error.response === undefined || (error.response.status >= 400 && error.response.status < 600) });
async function getIPv6Address() {
    const ipv6ApiEndpoint = 'https://ipv6bot.whatismyipaddress.com';
    let ipv6AddressPromise = axios.get(ipv6ApiEndpoint);
    while (true) {
        try {
            return (await ipv6AddressPromise).data;
        }
        catch (err) {
            ipv6AddressPromise = axios.get(ipv6ApiEndpoint);
        }
    }
}
async function updateRecords(zone, ipv6Address) {
    for (const record of (await axios.get(`${constants.dynv6ApiEndpoint}/zones/${zone.id}/records`, { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } })).data) {
        consume(axios.patch(`${constants.dynv6ApiEndpoint}/zones/${zone.id}/records/${record.id}`, { data: ipv6Address }, { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } }).then(response => console.log(`${new Date().toLocaleTimeString()}: ${response.data.name}${response.data.name === '' ? '' : '.'}${zone.name} address updated`)));
    }
}
function updateZone(zone, ipv6Address) {
    consume(axios.patch(`${constants.dynv6ApiEndpoint}/zones/${zone.id}`, { ipv6prefix: ipv6Address }, { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } }));
    consume(updateRecords(zone, ipv6Address));
}
async function update() {
    const ipv6AddressPromise = getIPv6Address();
    for (const zone of (await axios.get(`${constants.dynv6ApiEndpoint}/zones`, { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } })).data) {
        updateZone(zone, await ipv6AddressPromise);
    }
}
try {
    if (process.argv.length !== constants.requiredCommandLineArgCount)
        throw new Error('There must be exactly 1 command line argument passed in! Please try again.');
    consume(update());
}
catch (err) {
    console.log('dynv6-ip-update-client <http-token>');
    console.log('http-token: It must exists.');
    process.exit(-1);
}
setInterval(() => consume(update()), 300000);
