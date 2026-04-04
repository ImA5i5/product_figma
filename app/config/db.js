const mongoose=require("mongoose")
const connDB=async()=>{
    try{
        const dbCONN=await mongoose.connect(process.env.MONGO_URI)
        if(dbCONN){
            console.log("database connect successfully",dbCONN.connection.host)
        }
    }catch(error){
        console.log(error.message)
    }
}
module.exports=connDB