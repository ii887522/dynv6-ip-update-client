# dynv6-ip-update-client
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-standard.svg)](https://semver.org/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![Windows](https://svgshare.com/i/ZhY.svg)](https://svgshare.com/i/ZhY.svg)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-ffff00.svg)](https://www.javascript.com)
[![made-with-typescript](https://img.shields.io/badge/Made%20with-TypeScript-0000e0.svg)](https://www.typescriptlang.org/)
[![Npm package version](https://badgen.net/npm/v/@ii887522/dynv6-ip-update-client)](https://www.npmjs.com/package/@ii887522/dynv6-ip-update-client)
[![Npm package daily downloads](https://badgen.net/npm/dm/@ii887522/dynv6-ip-update-client)](https://npmjs.com/package/@ii887522/dynv6-ip-update-client)
[![Npm package license](https://badgen.net/npm/license/@ii887522/dynv6-ip-update-client)](https://npmjs.com/package/@ii887522/dynv6-ip-update-client)
[![Npm package dependents](https://badgen.net/npm/dependents/@ii887522/dynv6-ip-update-client)](https://npmjs.ccom/package/@ii887522/dynv6-ip-update-client)

It can update IP addresses of existing DNS records created in dynv6 which is a platform for getting public hostnames for your dynamic IPv4 and IPv6 addresses with the latest IP addresses from the client.

## Table of Contents
- [Coding Style](https://github.com/ii887522/dynv6-ip-update-client#coding-style)
- [Prerequisites](https://github.com/ii887522/dynv6-ip-update-client#prerequisites)
- [Install dependencies](https://github.com/ii887522/dynv6-ip-update-client#install-dependencies)
- [Automatically build project on save](https://github.com/ii887522/dynv6-ip-update-client#automatically-build-project-on-save)
- [Start project](https://github.com/ii887522/dynv6-ip-update-client#start-project)

## Coding Style
This project follows [Javascript Standard Style](https://standardjs.com/). Please familiarize yourself with the rules provided in the coding style and
make sure all the proposed code changes in your commits are conforming to the style before making a merge request. You can also make use of
StandardJS - Javascript Standard Style which is a [Visual Studio Code](https://code.visualstudio.com/) plugin and `test` command under the
[Install dependencies, build and test project](https://github.com/ii887522/hydro/blob/master/CONTRIBUTING.md#install-dependencies-build-and-test-project) section to support you.

## Prerequisites
- Windows 11 or Linux
- [Visual Studio Code](https://code.visualstudio.com/) with plugins:
  - EditorConfig for VS Code
  - Markdown All in One
  - StandardJS - Javascript Standard Style
  - YAML
- [Node.js 16.10.0](https://nodejs.org/en/) and later

## Install dependencies
```sh
ncu -u && npm install
```

## Automatically build project on save
```sh
npx tsc --watch
```

## Start project
```sh
npm start
```