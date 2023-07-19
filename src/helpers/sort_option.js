const DIRECTION = {
  ASCENDING: true,
  DESCENDING: false,
}

class SortOption {
  options = []

  addField(name, direct) {
    const direction = direct ?? true

    this.options.push({ field: name, direction })
  }
}

module.exports.SortOption = SortOption
module.exports.DIRECTION = DIRECTION
