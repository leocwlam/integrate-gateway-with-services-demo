const { SortOption, DIRECTION } = require('../helpers/sort_option')
const { Asset } = require('../entities/asset')
const { AssetService } = require('../services/asset_service')

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql')

const DESC = 'DESC'
const SUPPORTFIELDS = ['id', 'name', 'type', 'description', 'created_at']

const assetService = new AssetService()

const SortingParamType = new GraphQLInputObjectType({
  name: 'SortParm',
  description: 'Sorting Param',
  fields: () => ({
    field: { type: GraphQLNonNull(GraphQLString) },
    order: { type: GraphQLNonNull(GraphQLString) },
  }),
})

const SortingParamsType = new GraphQLInputObjectType({
  name: 'SortParms',
  description: 'Sorting Params',
  fields: () => ({
    fields: { type: GraphQLList(SortingParamType) },
  }),
})

const AssetType = new GraphQLObjectType({
  name: 'Asset',
  description: 'This Represents An Asset',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    type: { type: GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLNonNull(GraphQLString) },
    created_at: { type: GraphQLNonNull(GraphQLString) },
  }),
})

function isValidField(name) {
  return SUPPORTFIELDS.includes(name)
}

function getAllAssets(sortFields) {
  if (!sortFields || (sortFields?.length ?? 0) === 0) {
    return assetService.allAssets()
  }

  const sortOption = new SortOption()
  for (let sort of sortFields) {
    if (!isValidField(sort.field)) continue
    const order =
      sort.order === DESC ? DIRECTION.DESCENDING : DIRECTION.ASCENDING
    sortOption.addField(sort.field, order)
  }
  return assetService.allAssets(sortOption)
}

const queryList = [
  {
    assets: {
      type: GraphQLList(AssetType),
      description: 'List Of All Assets',
      args: {
        sorts: { type: SortingParamsType },
      },
      resolve: (_, args) => {
        const sortFields = args.sorts?.fields ?? null
        return getAllAssets(sortFields)
      },
    },
  },
  {
    asset: {
      type: AssetType,
      description: 'A Signle Asset',
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => assetService.getAsset(args.id),
    },
  },
]

const mutationList = [
  {
    addAsset: {
      type: AssetType,
      description: 'Add An Asset',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        return assetService.createAsset(args.name, args.type, args.description)
      },
    },
  },
  {
    changeAsset: {
      type: AssetType,
      description: 'Update An Asset',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const updateAsset = new Asset(
          args.id,
          args.name,
          args.type,
          args.description,
          null
        )
        return assetService.updateAsset(args.id, updateAsset)
      },
    },
  },
  {
    deleteAsset: {
      type: AssetType,
      description: 'Delete An Asset And Return The Asset That Was Deleted.',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        return assetService.deleteAsset(args.id)
      },
    },
  },
]

module.exports.queryList = queryList
module.exports.mutationList = mutationList
