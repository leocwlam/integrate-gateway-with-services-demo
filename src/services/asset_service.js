require('dotenv').config()
const { response } = require('express')
const { Asset } = require('../entities/asset')

const ASSET_SERVICE_URL =
  process.env.ASSET_SERVICE_URL ?? 'http://localhost:3000'

function toAssetEntity({ id, name, type, description, created }) {
  return new Asset(id, name, type, description, created)
}

function toAssetsEntity(assets) {
  const assetlist = []
  for (const asset of assets) {
    assetlist.push(toAssetEntity(asset))
  }
  return assetlist
}

class AssetService {
  #processAssets(assets, sortOptions) {
    const translateAssets = toAssetsEntity(assets)
    if (!sortOptions || !sortOptions?.options?.length) return translateAssets
    const result = translateAssets.sort((a, b) => {
      let resultResult = 0
      for (let sortOption of sortOptions.options) {
        if (sortOption.direction) {
          resultResult =
            resultResult || a[sortOption.field] - b[sortOption.field]
        } else {
          resultResult =
            resultResult || b[sortOption.field] - a[sortOption.field]
        }
      }
      return resultResult
    })
    return result
  }

  async allAssets(sortOptions) {
    return await fetch(`${ASSET_SERVICE_URL}/v1/assets`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return this.#processAssets(data, sortOptions)
      })
  }

  async getAsset(id) {
    return await fetch(`${ASSET_SERVICE_URL}/v1/assets/${id}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return toAssetEntity(data)
      })
  }

  async createAsset(name, type, description) {
    return await fetch(`${ASSET_SERVICE_URL}/v1/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data ? toAssetEntity(data) : null
      })
  }

  async updateAsset(id, modifyAsset) {
    if (!modifyAsset) return null
    return await fetch(`${ASSET_SERVICE_URL}/v1/assets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: modifyAsset.name,
        type: modifyAsset.type,
        description: modifyAsset.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data ? toAssetEntity(data) : null
      })
  }

  async deleteAsset(id) {
    return await fetch(`${ASSET_SERVICE_URL}/v1/assets/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        return data ? toAssetEntity(data) : null
      })
  }
}

module.exports.AssetService = AssetService
module.exports.toAssetEntity = toAssetEntity
