const { AssetService } = require('./asset_service')

test('create asset', () => {
  const assetService = new AssetService()
  const newAsset = assetService.createAsset('test', 1, 'create asset test')
  expect(newAsset.id).not.toBeNull()
  expect(newAsset.name).toBe('test')
  expect(newAsset.type).toBe(1)
  expect(newAsset.description).toBe('create asset test')
  expect(newAsset.created_at).not.toBeNull()
})

test('get asset', () => {
  const assetService = new AssetService()
  const newAsset = assetService.createAsset('test', 1, 'create asset test')
  const getAsset = assetService.getAsset(newAsset.id)
  expect(newAsset).toEqual(getAsset)
})

test('get all asset', () => {
  const assetService = new AssetService()
  const newAsset1 = assetService.createAsset('test1', 1, 'create asset test 1')
  const newAsset2 = assetService.createAsset('test2', 2, 'create asset test 2')
  const getAsset = assetService.allAsset()
  expect(getAsset.length).toBe(2)
})

test('update asset', () => {
  const assetService = new AssetService()
  const newAsset = assetService.createAsset('test', 1, 'create asset test')
  newAsset.name = 'change test name'
  newAsset.type = 123
  newAsset.description = 'change asset desc'
  const updateAsset = assetService.updateAsset(newAsset.id, newAsset)
  expect(updateAsset.id).toBe(newAsset.id)
  expect(updateAsset.name).toBe('change test name')
  expect(updateAsset.type).toBe(123)
  expect(updateAsset.description).toBe('change asset desc')
  expect(updateAsset.created_at).toBe(newAsset.created_at)
})

test('update not exist asset', () => {
  const assetService = new AssetService()
  const updateAsset = assetService.updateAsset('123', null)
  expect(updateAsset).toBeNull()
})

test('delete asset', () => {
  const assetService = new AssetService()
  const newAsset = assetService.createAsset('test', 1, 'create asset test')
  const deletedAsset = assetService.deleteAsset(newAsset.id)
  expect(deletedAsset).not.toBeNull()
})

test('delete not exist asset', () => {
  const assetService = new AssetService()
  const deletedAsset = assetService.deleteAsset('123')
  console.log(deletedAsset)
  expect(deletedAsset).toBeNull()
})
