const { GraphQLObjectType,Grap,GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLID } = require("graphql");

const users = [
  { id:1, name: "Naqvi", age: 34 },
  { id:2, name: "John", age: 21 },
];

const UserType= new GraphQLObjectType({
    name:"usertype",
    fields:()=>({
        id:{type:GraphQLID},
        name :{type:GraphQLString},
        age:{type:GraphQLInt}
    })
})

//query =>read data


const RootQuery= new GraphQLObjectType({
    name:"rootquery",
    //likely routes
    fields:{
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args,context){
                //get all users from db
                /* const users= await UsersSchema.find() */
                console.log(context.method);
                return users
            }
        },
        user:{
            type:UserType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                const user = users.find(item=>item.id===Number(args.id))
                return user
            }
        }

    }
})

//mutation =>update,delete,add
const Mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        addUser:{
            type:UserType,
            args:{
                id:{type:GraphQLID},
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args,context){
                //real application . add user into database
                console.log(context);
                users.push(args)
                return users[users.length-1]
            }
        },
        UpdateUser:{
            type:UserType,
            args:{
                id:{type:GraphQLID},
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                //real application . update user into database
                const user = users.find(item=>item.id===Number(args.id))
                user.name= args.name;
                user.age=args.age;

                return user
            }
        },
    }
})




module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})