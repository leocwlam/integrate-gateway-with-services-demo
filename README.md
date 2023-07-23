# leolam-gateway-demo

# <a name="quick-start"></a>Quick Start Running On Local

```bash
$ git clone https://github.com/leocwlam/leolam-gateway-demo.git demo
$ cd demo
$ npm install
$ npm run devStart
$ open -a "Google Chrome" http://localhost:4000/graphql
```

# <a name="test"></a>Run Test

```bash
$ npm test
```

![Test Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/test.png)

# <a name="config-asset-service"></a>Configuration Asset Service

- Change the ASSET_SERVICE_URL value in .env

or

```bash
$ ASSET_SERVICE_URL=http://localhost:3000 npm run devStart
```

# <a name="docker-image-container"></a>Build Local Docker Image And Create Container

- Make sure npm install before build docker image

```bash
$ docker build -t gateway:1.0 .
$ docker network create demo-network
$ docker run -d \
-p 4000:4000 \
--name gateway \
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
$ docker build -t gateway:1.0 .
$ docker build -t asset-service:1.0 .
```

- Note: `asset-service` can be clone from https://github.com/leocwlam/asset-service.

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

![List Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/list.png)

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

![Get Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/get.png)

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

![Create Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/create.png)

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

![Update Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/update.png)

## <a name="Delete-asset-id"></a>delete asset id

```
mutation {
  deleteAsset(id: "da7e60a9-4734-474a-96ff-bec11fa95ca4") {
    id
  }
}
```

![Delete Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/delete.png)

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

![Delete Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/sorted.png)
