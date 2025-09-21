<p align="center">
  <a href="https://github.com/xutyxd/voltra-hub-server">
    <picture>
      <source srcset="./voltra-hub-logo.png" width="150">
      <img alt="Voltra Hub logo" src="./voltra-hub-logo.png" width="150">
    </picture>
  </a>
</p>

# Voltra Hub Server

A server for the Voltra Hub API.

## Features
- OpenAPI definition
- Compliant server setup
- NPM package generation for seamless API development
- Handle ESIOS REE PVPC API without authentication

## Docker Setup
A docker image is available on [Docker Hub](https://hub.docker.com/r/xutyxd/voltra-hub-server)

All environment variables are optional and will start on 8080 by default.
Will use memory database by default.

### Usage

```bash
docker run -d \
  -p 8080:8080 \
  -e PORT=8080 \
  -e MONGODB_URI=mydatabase.example.com \
  -e MONGODB_DATABASE=voltrahub
  xutyxd/voltra-hub-server
```

## Quick Start Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xutyxd/voltra-hub-server
   cd voltra-hub-server

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate OpenAPI definition:**
   ```bash
   npm run openapi:bundle
   npm run openapi:types
   npm run openapi:docs
   ```

4. **Run the tests:**
   ```bash
   npm run test:ts
   npm run test:units
   npm run test:functionals
   ```

5. **Run the server:**
   ```bash
   npm run start:local
   ```

## Dependencies
Check dependencies for more documentation
- [Node.js](https://nodejs.org/en/) (v21.6.2)
- [npm](https://www.npmjs.com/) (v9.6.1)
- [SoE](https://github.com/xutyxd/server-over-express) (v1.6.1)
- [InversifyJS](https://github.com/inversify/InversifyJS) (v6.0.2)
- [OpenAPI Fetch](https://github.com/xutyxd/openapi-fetch) (v0.12.0)
- [Ajv](https://github.com/ajv-validator/ajv) (v8.17.1)
- [MongoDB](https://www.mongodb.com/) (v6.0.1)
- [ESIOS API Client](https://github.com/xutyxd/esios-api-client) (v1.1.6)

## License

This project is licensed under the AGPL-3.0 license - see the [LICENSE](LICENSE) file for details

<p align="left">
  Made with ☕ by
  <a href="https://github.com/xutyxd">
    XutyXD
  </a>
</p>