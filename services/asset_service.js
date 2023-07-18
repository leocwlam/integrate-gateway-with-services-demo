const { Asset } = require('../entities/asset')
const { v4: uuidv4 } = require('uuid')

class AssetService {
  cache = []

  allAsset() {
    return this.cache
  }

  getAsset(id) {
    return this.cache.find((asset) => asset.id === id)
  }

  createAsset(name, type, description) {
    const id = uuidv4()
    this.cache.push(new Asset(id, name, type, description, new Date()))
    return this.cache[this.cache.length - 1]
  }

  updateAsset(id, modifyAsset) {
    const asset = this.cache.find((asset) => asset.id === id)
    const index = this.cache.indexOf(asset)
    if (index === -1) return null

    asset.name = modifyAsset.name
    asset.type = modifyAsset.type
    asset.description = modifyAsset.description
    this.cache[index] = asset
    return this.cache[index]
  }

  deleteAsset(id) {
    const asset = this.cache.find((asset) => asset.id === id)
    if (this.cache.indexOf(asset) !== -1) {
      delete this.cache[this.cache.indexOf(asset)]
    }
    return asset ?? null
  }
}

module.exports.AssetService = AssetService
