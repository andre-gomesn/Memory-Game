import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true) //just to not get warning in the console

    if(isConnected){
        console.log("on");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"memory_game_languages",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        isConnected=true;
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}