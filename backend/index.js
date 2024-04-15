const express=require("express");
const mongoDB = require("./db")



const app = express();
const port =4000;
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();

})

 


app.use(express.json());
mongoDB();
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.get("/",(req,res)=>{
    res.send("Hello world!")
})


app.listen(port,()=>{
    console.log(`${port}`)
})