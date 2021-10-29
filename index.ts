#!/usr/bin/env node

'use strict'

import axios from 'axios'
import { consume } from '@ii887522/hydro'
import constants from './constants.js'

async function getIPv6Address (): Promise<string> {
  const ipv6ApiEndpoint = 'https://ipv6bot.whatismyipaddress.com'
  let ipv6AddressPromise = axios.get(ipv6ApiEndpoint)
  while (true) {
    try {
      return (await ipv6AddressPromise).data
    } catch (err) {
      ipv6AddressPromise = axios.get(ipv6ApiEndpoint)
    }
  }
}

async function update (): Promise<void> {
  const ipv6Address = await getIPv6Address()
  const dynv6ApiEndpoint = 'https://dynv6.com/api/v2'
  const zone = await axios.get(
    `${dynv6ApiEndpoint}/zones/by-name/${process.argv[constants.hostnameIndex] ?? ''}`,
    { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } }
  )
  consume(
    axios.patch(
      `${dynv6ApiEndpoint}/zones/${zone.data.id as number}`,
      { ipv6prefix: ipv6Address },
      { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } }
    ).then(() => console.log(`${new Date().toLocaleTimeString()}: ${process.argv[constants.hostnameIndex] ?? ''} address updated`))
  );
  (await axios.get(`${dynv6ApiEndpoint}/zones/${zone.data.id as number}/records`, { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } }))
    .data.filter((record: { name: string }) => record.name !== '').forEach(async (record: { id: any }) => await axios.patch(
      `${dynv6ApiEndpoint}/zones/${zone.data.id as number}/records/${record.id as number}`,
      { data: ipv6Address },
      { headers: { Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}` } }
    ).then(response => console.log(`${new Date().toLocaleTimeString()}: ${response.data.name as string}.${process.argv[constants.hostnameIndex] ?? ''} address updated`)))
}

try {
  if (process.argv.length !== constants.requiredCommandLineArgCount) throw new Error('There must be exactly 2 command line arguments passed in! Please try again.')
  consume(update())
} catch (err) {
  console.log('dynv6-ip-update-client <http-token> <hostname>')
  console.log('http-token: It must exists.')
  console.log('hostname: It must exists and is accessible by using the http-token passed in.')
  process.exit(-1)
}
setInterval(() => consume(update()), 300000)
