const mongoose= require("mongoose");

const connectToMongoDB=async ()=>
{
    try
    {
        await mongoose.connect("mongodb://127.0.0.1:27017/UrlShortener");

        console.log("MongoDB Connection Established");
    }
    catch(error)
    {
        console.error("Error connecting to MongoDB instance",error);
    }
}

module.exports=connectToMongoDB;