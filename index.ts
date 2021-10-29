#!/usr/bin/env node

'use strict'

import axios from 'axios'
import { consume } from '@ii887522/hydro'

const httpTokenIndex = 2
const hostnameIndex = 3

async function update (): Promise<void> {
  const ipv6AddressPromise = axios.get('https://ipv6bot.whatismyipaddress.com')
  const dynv6ApiEndpoint = 'https://dynv6.com/api/v2'
  const zone = await axios.get(
    `${dynv6ApiEndpoint}/zones/by-name/${process.argv[hostnameIndex] ?? ''}`, { headers: { Authorization: `Bearer ${process.argv[httpTokenIndex] ?? ''}` } }
  )
  const ipv6Address = (await ipv6AddressPromise).data
  consume(
    axios.patch(
      `${dynv6ApiEndpoint}/zones/${zone.data.id as number}`,
      { ipv6prefix: ipv6Address },
      { headers: { Authorization: `Bearer ${process.argv[httpTokenIndex] ?? ''}` } }
    ).then(() => console.log(`${new Date().toLocaleTimeString()}: ${process.argv[hostnameIndex] ?? ''} address updated`))
  );
  (await axios.get(`${dynv6ApiEndpoint}/zones/${zone.data.id as number}/records`, { headers: { Authorization: `Bearer ${process.argv[httpTokenIndex] ?? ''}` } })).data
    .filter((record: { name: string }) => record.name !== '').forEach(async (record: { id: any }) => await axios.patch(
      `${dynv6ApiEndpoint}/zones/${zone.data.id as number}/records/${record.id as number}`,
      { data: ipv6Address },
      { headers: { Authorization: `Bearer ${process.argv[httpTokenIndex] ?? ''}` } }
    ).then(response => console.log(`${new Date().toLocaleTimeString()}: ${response.data.name as string}.${process.argv[hostnameIndex] ?? ''} address updated`)))
}

consume(update())
setInterval(() => consume(update()), 300000)
