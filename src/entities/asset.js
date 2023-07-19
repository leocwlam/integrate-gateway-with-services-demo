class Asset {
  constructor(id, name, type, description, created_at) {
    this.id = id
    this.name = name
    this.type = type
    this.description = description
    this.created_at = created_at
  }
}

module.exports.Asset = Asset
