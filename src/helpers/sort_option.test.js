const { SortOption, DIRECTION } = require('./sort_option')

test('add test field with ascending', () => {
  const sortOption = new SortOption()
  sortOption.addField('test', DIRECTION.ASCENDING)

  expect(sortOption.options.length).toBe(1)
  expect(sortOption.options[0].field).toBe('test')
  expect(sortOption.options[0].direction).toBe(true)
})

test('add test field with descending', () => {
  const sortOption = new SortOption()
  sortOption.addField('test', DIRECTION.DESCENDING)

  expect(sortOption.options.length).toBe(1)
  expect(sortOption.options[0].field).toBe('test')
  expect(sortOption.options[0].direction).toBe(false)
})

test('add test field with missing direction', () => {
  const sortOption = new SortOption()
  sortOption.addField('test', null)

  expect(sortOption.options.length).toBe(1)
  expect(sortOption.options[0].field).toBe('test')
  expect(sortOption.options[0].direction).toBe(true)
})

test('sort option with correct order', () => {
  const sortOption = new SortOption()
  sortOption.addField('field1', DIRECTION.ASCENDING)
  sortOption.addField('field2', DIRECTION.DESCENDING)

  expect(sortOption.options.length).toBe(2)
  expect(sortOption.options[0].field).toBe('field1')
  expect(sortOption.options[0].direction).toBe(true)
  expect(sortOption.options[1].field).toBe('field2')
  expect(sortOption.options[1].direction).toBe(false)
})
