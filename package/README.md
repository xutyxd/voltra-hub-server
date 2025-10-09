<p align="center">
  <a href="https://github.com/xutyxd/voltra-hub-api-client">    <picture>
      <source srcset="../voltra-hub-logo.png" width="150">
      <img alt="TS Contract First logo" src="./voltra-hub-logo.png" width="150">
    </picture>
  </a>
</p>

<h1 align="center">
  Client to interact with Voltra Hub API
</h1>

<p align="left">
    <img src="https://img.shields.io/npm/dw/voltra-hub-api-client">
    <img alt="NPM Unpacked Size" src="https://img.shields.io/npm/unpacked-size/voltra-hub-api-client">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/voltra-hub-api-client">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/voltra-hub-api-client">
</p>

# Voltra Hub Server

OpenAPI package for Voltra Hub API.

## 📦 Packages

### 📦 CommonJS

```js
const { VoltraHubAPIClient } = require('voltra-hub-api-client');
```

### 📦 ESM

```js
import { VoltraHubAPIClient } from 'voltra-hub-api-client';
```

### 📦 TypeScript

```ts
import { VoltraHubAPIClient } from 'voltra-hub-api-client';
```

## Usage

```ts
import { VoltraHubAPIClient } from 'voltra-hub-api-client';

const client = new VoltraHubAPIClient('https://voltrahub.com/api');
// Check if the server is up
const healthCheck = await client.healthCheck();
console.log(healthCheck);

// Get PVPC for today
const pvpcToday = await client.pvpc.get(new Date());
console.log(pvpcToday);

// Get PVPC as indicator for a specific date
const pvpcDate = await client.indicator.pvpc.get(new Date('2025-09-01'));
console.log(pvpcDate);

// Get Spot for today
const spotToday = await client.indicator.spot.get(new Date());
console.log(spotToday);
```


## 📝 License

This project is licensed under the `GNU AFFERO GENERAL PUBLIC LICENSE` - see the [LICENSE](LICENSE) file for details