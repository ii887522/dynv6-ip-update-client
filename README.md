# dynv6-ip-update-client

[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-standard.svg)](https://semver.org/)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![Windows](https://svgshare.com/i/ZhY.svg)](https://svgshare.com/i/ZhY.svg)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-ffff00.svg)](https://www.javascript.com)
[![made-with-typescript](https://img.shields.io/badge/Made%20with-TypeScript-0000e0.svg)](https://www.typescriptlang.org/)
[![Npm package version](https://badgen.net/npm/v/@ii887522/dynv6-ip-update-client)](https://www.npmjs.com/package/@ii887522/dynv6-ip-update-client)
[![Npm package daily downloads](https://badgen.net/npm/dm/@ii887522/dynv6-ip-update-client)](https://npmjs.com/package/@ii887522/dynv6-ip-update-client)
[![Npm package license](https://badgen.net/npm/license/@ii887522/dynv6-ip-update-client)](https://npmjs.com/package/@ii887522/dynv6-ip-update-client)
[![Npm package dependents](https://badgen.net/npm/dependents/@ii887522/dynv6-ip-update-client)](https://npmjs.com/package/@ii887522/dynv6-ip-update-client)

Update IP addresses of existing DNS records created in dynv6 which is a platform for getting public hostnames for your dynamic IPv4 and IPv6 addresses with the latest IP addresses from the client.

## Table of Contents

- [Usage](https://github.com/ii887522/dynv6-ip-update-client#usage)
- [Prerequisites](https://github.com/ii887522/dynv6-ip-update-client#prerequisites)
- [Install dependencies](https://github.com/ii887522/dynv6-ip-update-client#install-dependencies)
- [Lint the project](https://github.com/ii887522/dynv6-ip-update-client#lint-the-project)
- [Build the project](https://github.com/ii887522/dynv6-ip-update-client#build-the-project)
- [Automatically build the project on save](https://github.com/ii887522/dynv6-ip-update-client#automatically-build-the-project-on-save)
- [Start the project](https://github.com/ii887522/dynv6-ip-update-client#start-the-project)

## Usage

```sh
dynv6-ip-update-client <http-token>
```

## Prerequisites

- Windows 11 or Linux
- [Visual Studio Code](https://code.visualstudio.com/) with plugins:
  - EditorConfig for VS Code
  - ESLint
  - Prettier - Code formatter
- [Node.js 16.17.1](https://nodejs.org/en/) and later

## Install dependencies

```sh
npm install
```

## Lint the project

```sh
npm run lint
```

## Automatically lint the project on save

```sh
npm run lint:watch
```

## Build the project

```sh
npm run build
```

## Automatically build the project on save

```sh
npm run build:watch
```

## Start the project

```sh
npm start <http-token>
```
