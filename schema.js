const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


// Hardcode data
// const customers = [
//     {id: 1 , name: 'zack', email: 'zack@learn.com', age: 27},
//     {id: 2 , name: 'lack', email: 'lack@learn.com', age: 27},
//     {id: 3 , name: 'jack', email: 'jack@learn.com', age: 27},
//     {id: 4 , name: 'vaack', email: 'vaack@learn.com', age: 27}
// ]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})
// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                // for(let i = 0; i< customers.length;i++){
                //     if(customers[i].id == args.id){
                //         return customers[i]
                //     }
                // }
                return axios.get('http://localhost:3000/customers' + args.id).then(res => res.data)
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(paranetValue, agrs) {
                return axios.get('http://localhost:3000/customers').then(res => res.data)
            }
        }
    }


})

// mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        editCustormer: {
            type: CustomerType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(paranetValue, args) {
                return axios.patch('http://localhost:3000/customers/' + args.id, args).then(res => res.data)
            }
        },
        delCustormer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(paranetValue, args) {
                return axios.delete('http://localhost:3000/customers/' + args.id).then(res => res.data)
            }
        },
        addCustormer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(paranetValue, args) {
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then(res => res.data)
            }
        }

    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})