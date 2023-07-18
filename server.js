const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const { Asset } = require('./entities/asset')
const { AssetService } = require('./services/asset_service')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql')
const app = express()

const assetService = new AssetService()
const assets = []

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

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    assets: {
      type: GraphQLList(AssetType),
      description: 'List Of All Assets',
      resolve: () => assetService.allAsset(),
    },
    asset: {
      type: AssetType,
      description: 'A Signle Asset',
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => assetService.getAsset(args.id),
    },
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
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
  }),
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
)
app.listen(4000, () => console.log('Gateway Server Running'))
