# integrate-gateway-with-services-demo

> Gateway GraphQL calling asset service demo.

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/leocwlam/integrate-gateway-with-services-demo/blob/master/LICENSE)
[![Build Status](https://api.travis-ci.com/leocwlam/integrate-gateway-with-services-demo.svg?branch=master)](https://app.travis-ci.com/leocwlam/integrate-gateway-with-services-demo)
[![Coverage Status](https://coveralls.io/repos/github/leocwlam/integrate-gateway-with-services-demo/badge.svg?branch=master)](https://coveralls.io/github/leocwlam/integrate-gateway-with-services-demo?branch=master)
[![Dependency Status](https://david-dm.org/leocwlam/integrate-gateway-with-services-demo.svg)](https://david-dm.org/leocwlam/integrate-gateway-with-services-demo)
[![devDependency Status](https://david-dm.org/leocwlam/integrate-gateway-with-services-demo/dev-status.svg)](https://david-dm.org/leocwlam/integrate-gateway-with-services-demo?type=dev)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/leocwlam/integrate-gateway-with-services-demo/badge.svg)](https://snyk.io/test/github/leocwlam/integrate-gateway-with-services-demo)
[![npm badge](https://img.shields.io/npm/v/integrate-gateway-with-services-demo/latest.svg)](https://www.npmjs.com/package/integrate-gateway-with-services-demo)

# Contents

---

<p align="center">
    <a href="#quick-start">Quick Start</a> &bull;
    <a href="#test">Run Test</a> &bull;
    <a href="#docker-image-container">Build Local Docker Image And Create Container</a> &bull;
    <a href="#example">Example</a> &bull;
    <a href="#license">License</a>
</p>

---

# <a name="quick-start"></a>Quick Start

```bash
$ git clone https://github.com/leocwlam/integrate-gateway-with-services-demo.git integrate-gateway-with-services-demo
$ cd integrate-gateway-with-services-demo
$ npm install
$ npm run devStart
$ open -a "Google Chrome" http://localhost:4000/graphql
```

# <a name="test"></a>Run Test

```bash
$ npm test
```

![Test Output](https://raw.githubusercontent.com/leocwlam/integrate-gateway-with-services-demo/master/docs/test.png)

# <a name="config-java-spring-REST-API-demo"></a>Configuration Asset Service

- Change the ASSET_SERVICE_URL value in .env

or

```bash
$ ASSET_SERVICE_URL=http://localhost:3000 npm run devStart
```

# <a name="docker-image-container"></a>Build Local Docker Image And Create Container

- Make sure npm install before build docker image

```bash
$ docker build -t integrate-gateway-with-services-demo:1.0 .
$ docker network create demo-network
$ docker run -d \
-p 4000:4000 \
--name integrate-gateway-with-services-demo \
--network demo-network \
-e ASSET_SERVICE_URL=http://host.docker.internal:3000 \
gateway:1.0
$ open -a "Google Chrome" http://localhost:4000/graphql
```

- Note: We can skip create network `demo-network`, if we already created network before.

# <a name="docker-stop"></a>Stop Gateway Container

```bash
$ docker stop gateway
```

# <a name="docker-start"></a>Start Gateway Container

```bash
$ docker start gateway
```

# <a name="Simple start up" >Simple Local Dev Docker Startup

```bash
$ docker build -t integrate-gateway-with-services-demo:1.0 .
$ docker build -t java-spring-REST-API-demo:1.0 .
```

- Note: `java-spring-REST-API-demo` can be clone from https://github.com/leocwlam/java-spring-REST-API-demo.

```bash
$ docker-compose -f dev-gateway.yaml up -d
$ open -a "Google Chrome" http://localhost:4000/graphql
```

# <a name="Simple start up" >Simple Local Dev Docker Tilt Down

```bash
$ docker-compose -f dev-gateway.yaml down
```

# <a name="example"></a>Example

## <a name="get-all-assets"></a>Get all assets

```
{
  assets {
    id
    name
    type
    description
    created_at
  }
}
```

![List Output](https://raw.githubusercontent.com/leocwlam/integrate-gateway-with-services-demo/master/docs/list.png)

## <a name="get-asset-id"></a>Get asset id

```
{
  asset(id:"da7e60a9-4734-474a-96ff-bec11fa95ca4") {
    id
    name
    type
    description
    created_at
  }
}

```

![Get Output](https://raw.githubusercontent.com/leocwlam/integrate-gateway-with-services-demo/master/docs/get.png)

## <a name="Add-new-asset"></a>Add new asset

```
mutation {
  addAsset(name: "test1", type: 1, description: "test 1") {
    id
    name
    type
    description
    created_at
  }
}
```

![Create Output](https://raw.githubusercontent.com/leocwlam/integrate-gateway-with-services-demo/master/docs/create.png)

## <a name="Update-asset-id"></a>Update asset

```
mutation {
  changeAsset(id: "da7e60a9-4734-474a-96ff-bec11fa95ca4", name: "Change A2", type: 2, description: "Change Desc 2") {
    id
    name
    type
    description
    created_at
  }
}
```

![Update Output](https://raw.githubusercontent.com/leocwlam/integrate-gateway-with-services-demo/master/docs/update.png)

## <a name="Delete-asset-id"></a>delete asset id

```
mutation {
  deleteAsset(id: "da7e60a9-4734-474a-96ff-bec11fa95ca4") {
    id
  }
}
```

![Delete Output](https://raw.githubusercontent.com/leocwlam/integrate-gateway-with-services-demo/master/docs/delete.png)

## <a name="Sorted-assets"></a>Sorted assets

```
{
  assets(sorts:{fields:[{field: "type", order:"DESC"}, {field: "name", order:"ASC"}]}) {
    id
    name
    type
    description
    created_at
  }
}
```

![Delete Output](https://raw.githubusercontent.com/leocwlam/integrate-gateway-with-services-demo/master/docs/sorted.png)

# <a name="license"></a>License

MIT
