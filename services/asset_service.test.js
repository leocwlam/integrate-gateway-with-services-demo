const { SortOption, DIRECTION } = require('../helpers/sort_option')
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
  const asset = assetService.getAsset(newAsset.id)
  expect(newAsset).toEqual(asset)
})

test('get all assets', () => {
  const assetService = new AssetService()
  const newAsset1 = assetService.createAsset('test1', 1, 'create asset test 1')
  const newAsset2 = assetService.createAsset('test2', 2, 'create asset test 2')
  const assets = assetService.allAssets()
  expect(assets.length).toBe(2)
})

test('get all assets with null sort option', () => {
  const assetService = new AssetService()
  const newAsset1 = assetService.createAsset('test1', 1, 'create asset test 1')
  const newAsset2 = assetService.createAsset('test2', 2, 'create asset test 2')
  const getAsset = assetService.allAssets(null)
  expect(getAsset.length).toBe(2)
})

test('get all assets with single sort option', () => {
  const assetService = new AssetService()
  const newAsset1 = assetService.createAsset('test1', 1, 'create asset test 1')
  const newAsset2 = assetService.createAsset('test2', 2, 'create asset test 2')
  const sortOption = new SortOption()
  sortOption.addField('type', DIRECTION.DESCENDING)
  const assets = assetService.allAssets(sortOption)
  expect(assets.length).toBe(2)
  expect(assets[0]).toEqual(newAsset2)
  expect(assets[1]).toEqual(newAsset1)
})

test('get all assets with mulitple sort options', () => {
  const assetService = new AssetService()
  const newAsset1 = assetService.createAsset('test1', 1, 'create asset test 1')
  const newAsset2 = assetService.createAsset('test2', 2, 'create asset test 2')
  const newAsset3 = assetService.createAsset('test3', 2, 'create asset test 2')
  const sortOption = new SortOption()
  sortOption.addField('type', DIRECTION.DESCENDING)
  sortOption.addField('name', DIRECTION.ASCENDING)
  const assets = assetService.allAssets(sortOption)
  expect(assets.length).toBe(3)
  expect(assets[0]).toEqual(newAsset2)
  expect(assets[1]).toEqual(newAsset3)
  expect(assets[2]).toEqual(newAsset1)
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
  expect(deletedAsset).toBeNull()
})
