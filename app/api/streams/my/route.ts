import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    const session = await getServerSession()
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email || "",
        },
    });

    if (!user) {
        return NextResponse.json(
            {
                message: "User not found",
            },
            {
                status: 403,
            }
        );
    }
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: user.id ?? "",
        },
        include:{
            _count: {
                select:{
                    upVotes:true,
                }
            }
        }
    });

    return NextResponse.json({ streams: streams });

}

