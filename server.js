var express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');
const graphqlHTTP = require ('express-graphql')
const app = express();

app.use('/graphql',graphqlHTTP(()=>({
    schema,
    graphiql:true,
    pretty:true
})))


app.listen(4000, () => {
    console.log('server is running on port 4000....')
})

