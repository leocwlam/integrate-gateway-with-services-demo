const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql')
const app = express()

const assets = []

const AssetType = new GraphQLObjectType({
  name: 'Asset',
  description: 'This Represents An Asset',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
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
      resolve: () => assets,
    },
    asset: {
      type: AssetType,
      description: 'A Signle Asset',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => assets.find((asset) => asset.id === args.id),
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
        const asset = {
          id: assets.length + 1,
          name: args.name,
          type: args.type,
          description: args.description,
          created_at: new Date(),
        }
        assets.push(asset)
        return asset
      },
    },
    changeAsset: {
      type: AssetType,
      description: 'Update An Asset',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const asset = assets.find((asset) => asset.id === args.id)
        const loc = assets.indexOf(asset)
        if (loc !== -1) {
          asset.name = args.name
          asset.type = args.type
          asset.description = args.description
          assets[loc] = asset
        }

        return asset
      },
    },
    deleteAsset: {
      type: AssetType,
      description: 'Delete An Asset And Return The Asset That Was Deleted.',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => {
        const asset = assets.find((asset) => asset.id === args.id)
        if (assets.indexOf(asset) !== -1) {
          delete assets[assets.indexOf(asset)]
        }
        return asset
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
