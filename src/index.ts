#!/usr/bin/env node

'use strict'

import axios from 'axios'
import { consume } from '@ii887522/hydro'
import axiosRetry, { exponentialDelay } from 'axios-retry'
import { publicIpv6 } from 'public-ip'
import constants from './constants.js'
import Zone from './Zone'

//
axiosRetry(axios, {
  retries: 16,
  retryDelay: exponentialDelay,
  retryCondition: error =>
    error.response === undefined || (error.response.status >= 500 && error.response.status < 600),
})

async function updateRecords(zone: Zone, ipv6Address: string): Promise<void> {
  for (const record of (
    await axios.get(`${constants.dynv6ApiEndpoint}/zones/${zone.id}/records`, {
      headers: {
        Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}`,
      },
    })
  ).data) {
    consume(
      axios
        .patch(
          `${constants.dynv6ApiEndpoint}/zones/${zone.id}/records/${record.id as number}`,
          { data: ipv6Address },
          {
            headers: {
              Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}`,
            },
          }
        )
        .then(response =>
          console.log(
            `${new Date().toLocaleTimeString()}: ${response.data.name as string}${
              response.data.name === '' ? '' : '.'
            }` + `${zone.name} address updated`
          )
        )
    )
  }
}

function updateZone(zone: Zone, ipv6Address: string): void {
  consume(
    axios.patch(
      `${constants.dynv6ApiEndpoint}/zones/${zone.id}`,
      { ipv6prefix: ipv6Address },
      {
        headers: {
          Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}`,
        },
      }
    )
  )
  consume(updateRecords(zone, ipv6Address))
}

async function update(): Promise<void> {
  const ipv6AddressPromise = publicIpv6()
  for (const zone of (
    await axios.get(`${constants.dynv6ApiEndpoint}/zones`, {
      headers: {
        Authorization: `Bearer ${process.argv[constants.httpTokenIndex] ?? ''}`,
      },
    })
  ).data) {
    updateZone(zone, await ipv6AddressPromise)
  }
}

if (process.argv.length !== constants.requiredCommandLineArgCount) {
  throw new Error('There must be exactly 1 command line argument passed in! Please try again.')
}
consume(update())
setInterval(() => consume(update()), 300000)
