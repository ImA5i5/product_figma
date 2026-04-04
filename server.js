require("dotenv").config();
const app=require("./app.js")
const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`app is running on port http://localhost:${port}`)
})