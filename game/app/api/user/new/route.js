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
        return new Response(JSON.stringify(user.username),{status:201})

    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})
    }
}