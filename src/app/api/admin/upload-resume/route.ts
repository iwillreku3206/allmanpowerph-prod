import { NextRequest, NextResponse } from "next/server";
import * as AWS from '@aws-sdk/client-s3';
import { createHash } from "crypto";

export async function POST(req: NextRequest) {

  // Filename and filedata
  const formData = await req.formData();
  const [ fileName, fileData ]  = [ formData.get('fileName'), formData.get('fileData') ];

  // S3 client
  // @ts-ignore
  const client = new AWS.S3({
    forcePathStyle: true,
    region: 'ap-southeast-1',
    endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
    }
  })

  // Missing fields
  if (!fileName || !fileData) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  // Upload object
  const response = await client.send(new AWS.PutObjectCommand({
    Key: fileName,
    Body: await fileData.arrayBuffer(),
    ContentType: fileData.type,
    Bucket: 'resume-bucket',
  }))
  
  return NextResponse.json({
    etag: response.ETag,
    error: !response.ETag
  })
}
