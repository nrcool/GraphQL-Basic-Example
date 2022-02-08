const express = require("express")
const app = express()
const {graphqlHTTP} = require("express-graphql");
const PORT =process.env.PORT || 4000;
const Schema = require("./schema")

const Middleware=(req,res,next)=>{
console.log("middleware");
next()
}
app.use("/graphql",Middleware, new graphqlHTTP({
    schema:Schema,
    graphiql:true
}))



app.listen(PORT,()=>console.log("server is running on port 4000"))