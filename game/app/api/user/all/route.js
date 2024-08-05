import { connectToDB } from "@utils/database";
import User from "@models/user";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (req) => {
    noStore()
    try {
        await connectToDB();
        // const { id } = await req.json();

        const today = new Date()
        today.setHours(0,0,0,0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const users = await User.find({
            createdAt: {
                $gte: today,
                $lt: tomorrow
            }
        }).sort({ score: -1 });

        return new Response(JSON.stringify(users), { status: 200 })
    }
    catch {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}