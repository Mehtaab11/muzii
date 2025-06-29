import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const YT_REGEX = new RegExp(
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/
);

const StreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = StreamSchema.parse(await req.json());

    const isYt = YT_REGEX.test(data.url);
    if (!isYt) {
      return NextResponse.json(
        {
          message: "Invalid Youtube URL",
        },
        { status: 411 }
      );
    }

    const extractedId = data.url.split("v=")[1];

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while creating stream: " + error,
      },
      { status: 411 }
    );
  }
}


// export async function GET(req:NextRequest){
//   try { 
//     const streams = await prismaClient.stream.fin
//   }
// }