const { fetchMock, enableFetchMocks } = require('jest-fetch-mock')
const { SortOption, DIRECTION } = require('../helpers/sort_option')
const { AssetService, toAssetEntity } = require('./asset_service')

enableFetchMocks()

describe('Asset Service test', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  const getResponseTestData = (id, type = 1) => {
    return {
      id: `${id}`,
      name: `test${id}`,
      type: type,
      description: `desc ${id}`,
      created: `2023-07-22T23:52:13.758594562`,
    }
  }

  test('create asset', async () => {
    const testAsset = getResponseTestData('1')
    fetch.mockResponseOnce(JSON.stringify(testAsset))
    const assetService = new AssetService()
    const newAsset = await assetService.createAsset(
      testAsset.id,
      testAsset.type,
      testAsset.description
    )
    expect(newAsset).not.toBeNull()
    expect(newAsset.id).toBe(testAsset.id)
    expect(newAsset.name).toBe(testAsset.name)
    expect(newAsset.type).toBe(testAsset.type)
    expect(newAsset.description).toBe(testAsset.description)
    expect(newAsset.created_at).toBe(testAsset.created)
  })

  test('create asset fail on asset service', async () => {
    const testAsset = getResponseTestData('1')
    fetch.mockResponseOnce(JSON.stringify(null))
    const assetService = new AssetService()
    const newAsset = await assetService.createAsset(
      testAsset.id,
      testAsset.type,
      testAsset.description
    )
    expect(newAsset).toBeNull()
  })

  test('get asset', async () => {
    const testAsset = getResponseTestData('1')
    fetch.mockResponseOnce(JSON.stringify(testAsset))
    const assetService = new AssetService()
    const asset = await assetService.getAsset('1')
    expect(toAssetEntity(testAsset)).toEqual(asset)
  })

  test('get all assets', async () => {
    const testAsset1 = getResponseTestData('1')
    const testAsset2 = getResponseTestData('2', 2)
    fetch.mockResponseOnce(JSON.stringify([testAsset1, testAsset2]))
    const assetService = new AssetService()
    const assets = await assetService.allAssets()
    expect(assets.length).toBe(2)
  })

  test('get all assets with null sort option', async () => {
    const testAsset1 = getResponseTestData('1')
    const testAsset2 = getResponseTestData('2', 2)
    fetch.mockResponseOnce(JSON.stringify([testAsset1, testAsset2]))
    const assetService = new AssetService()
    const getAsset = await assetService.allAssets(null)
    expect(getAsset.length).toBe(2)
  })

  test('get all assets with single sort option', async () => {
    const testAsset1 = getResponseTestData('1')
    const testAsset2 = getResponseTestData('2', 2)
    fetch.mockResponseOnce(JSON.stringify([testAsset1, testAsset2]))
    const assetService = new AssetService()
    const sortOption = new SortOption()
    sortOption.addField('type', DIRECTION.DESCENDING)
    const assets = await assetService.allAssets(sortOption)
    expect(assets.length).toBe(2)
    expect(assets[0]).toEqual(toAssetEntity(testAsset2))
    expect(assets[1]).toEqual(toAssetEntity(testAsset1))
  })

  test('get all assets with mulitple sort options', async () => {
    const testAsset1 = getResponseTestData('1')
    const testAsset2 = getResponseTestData('2', 2)
    const testAsset3 = getResponseTestData('3', 2)
    fetch.mockResponseOnce(JSON.stringify([testAsset1, testAsset2, testAsset3]))
    const assetService = new AssetService()
    const sortOption = new SortOption()
    sortOption.addField('type', DIRECTION.DESCENDING)
    sortOption.addField('name', DIRECTION.ASCENDING)
    const assets = await assetService.allAssets(sortOption)
    expect(assets.length).toBe(3)
    expect(assets[0]).toEqual(toAssetEntity(testAsset2))
    expect(assets[1]).toEqual(toAssetEntity(testAsset3))
    expect(assets[2]).toEqual(toAssetEntity(testAsset1))
  })

  test('update asset', async () => {
    const testAsset = getResponseTestData('1')
    fetch.mockResponseOnce(JSON.stringify(testAsset))
    const assetService = new AssetService()
    const updateAsset = await assetService.updateAsset('1', testAsset)
    expect(updateAsset.id).toBe(testAsset.id)
    expect(updateAsset.name).toBe(testAsset.name)
    expect(updateAsset.type).toBe(testAsset.type)
    expect(updateAsset.description).toBe(testAsset.description)
    expect(updateAsset.created_at).toBe(testAsset.created)
  })

  test('update asset fail on asset service', async () => {
    const testAsset = getResponseTestData('1')
    fetch.mockResponseOnce(JSON.stringify(null))
    const assetService = new AssetService()
    const updateAsset = await assetService.updateAsset('1', testAsset)
    expect(updateAsset).toBeNull()
  })

  test('update not exist asset', async () => {
    fetch.mockResponseOnce(JSON.stringify(null))
    const assetService = new AssetService()
    const updateAsset = await assetService.updateAsset('123', null)
    expect(updateAsset).toBeNull()
  })

  test('delete asset', async () => {
    fetch.mockResponseOnce(JSON.stringify(getResponseTestData('1')))
    const assetService = new AssetService()
    const deletedAsset = await assetService.deleteAsset('1')
    expect(toAssetEntity(deletedAsset)).not.toBeNull()
  })

  test('delete not exist asset', async () => {
    fetch.mockResponseOnce(JSON.stringify(null))
    const assetService = new AssetService()
    const deletedAsset = await assetService.deleteAsset('123')
    expect(deletedAsset).toBeNull()
  })
})
