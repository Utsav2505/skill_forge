import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    console.log("Request params:", params); // Log params object

    // Ensure that params object exists and contains email property
    const email = params && params.email;

    if (!email) {
        console.error("Email parameter not found.");
        return new NextResponse({
            status: 400,
            body: { message: "Email parameter not found" }
        });
    }

    const { newName: name, newStatus: employment_status, newPhone: phone, newBio: bio, newDesignation: designation, newResume: resume } = request.json();

    try {
        await connectToDB();
        console.log("Connected to the database.");

        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name,
                    employment_status,
                    phone,
                    bio,
                    designation,
                    resume
                }
            },
            { new: true } // To return the updated document
        );
        console.log("Updated user:", updatedUser);

        if (updatedUser) {
            return new NextResponse({
                status: 200,
                body: { message: "User data updated successfully", updatedUser }
            });
        } else {
            console.log("User not found.");
            return new NextResponse({
                status: 404,
                body: { message: "User not found" }
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse({
            status: 500,
            body: { message: "Internal server error" }
        });
    }
}
