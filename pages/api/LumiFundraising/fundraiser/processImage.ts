import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

type responseObject = {
  error: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = async (req: NextApiRequest):
Promise<{fields: formidable.Fields; files: formidable.Files}> => {
  const options: formidable.Options = {};
  options.uploadDir = path.join(process.cwd(), "public", "assets", "images", "logos");
  options.maxFileSize = 4000 * 1024 * 1024;
  options.filename = (name, ext, part, form) => {
    return req.cookies.currentUser + "_" + part.originalFilename; //TODO: update to be dynamic
}
  const form = formidable(options);
  return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObject>
) {
  //make sure location exists
  try{
    await fs.readdir(path.join(process.cwd(), "public", "assets", "images", "logos"));
  } catch(e){
    await fs.mkdir(path.join(process.cwd(), 'public', "assets","images", "logos"));
  }
  await readFile(req)
  res.json({ error: "ok" });
}
