import { connectToDB } from "@utils/database";
import User from "@models/user";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (req,{params}) => {
    noStore();
    try {
        await connectToDB();
        // const randomQuestions = await Question.find({})
        const userExist = await User.find({username: params.username});

        console.log(userExist);

        return new Response(JSON.stringify(userExist),{status:200})

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
}