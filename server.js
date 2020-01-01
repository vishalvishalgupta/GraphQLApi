const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const cors = require('cors')
const dotEnv = require('dotenv')
// gql is template literal tag for defining the schema definition
// language
dotEnv.config();

const app = express();

app.use(express.json());

const typeDefs = gql`
    type Query{
        greetings: String
    }
`

const resolvers = {};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

apolloServer.applyMiddleware({app, path: '/graphql'})

app.use(cors())

const port =  process.env.PORT || 3000;

app.use('/', (req, res, next)=>{
    res.send({ message: "Hello, I am Vishal Gupta"})
})

app.listen(port, ()=>{
    console.log(`Server is listening at: ${port}`)
    console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`)
})