# leolam-gateway-demo

# <a name="quick-start"></a>Quick Start Running On Local

```bash
$ git clone https://github.com/leocwlam/leolam-gateway-demo.git demo
$ cd demo
$ npm install
$ npm run devStart
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
  asset(id:2) {
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
  addAsset(name: "ad1", type: 3, description: "test desc") {
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
  changeAsset(id: 2, name: "C Name", type: 2, description: "Change Desc") {
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
  deleteAsset(id: 2) {
    id
  }
}
```

![Delete Output](https://raw.githubusercontent.com/leocwlam/leolam-gateway-demo/master/docs/delete.png)