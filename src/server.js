const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  queryList: assetQueryList,
  mutationList: assetMutationList,
} = require('./controllers/asset_controller')

const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const app = express()

function buildFieldsMethod(fields, methodlist) {
  for (let method of methodlist) {
    const name = Object.getOwnPropertyNames(method)[0]
    fields[name] = method[name]
  }
}

const queryFields = () => {
  const fields = {}
  buildFieldsMethod(fields, assetQueryList)
  return fields
}

const mutationFields = () => {
  const fields = {}
  buildFieldsMethod(fields, assetMutationList)
  return fields
}

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => queryFields(),
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => mutationFields(),
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
