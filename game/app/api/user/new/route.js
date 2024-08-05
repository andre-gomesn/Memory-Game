import { connectToDB } from "@utils/database";
import User from "@models/user";

export const POST = async (req)=>{
    const {username, score} = await req.json();
    try {
        await connectToDB();
        const newUser = new User({
            username,
            score
        })

        const user = await newUser.save();
        console.log(user._id);
        return new Response(JSON.stringify(user._id),{status:201})

    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})
    }
}