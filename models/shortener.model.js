// import { readFile, writeFile } from "fs/promises";
// import path from "path";

// const DATA_FILE = path.join("data", "links.json");


// export const loadLinks = async () => {
//     try {
//         const data = await readFile(DATA_FILE, "utf-8");
//         return JSON.parse(data);
//     } catch (error) {
//         if (error.code === "ENOENT") {
//             await writeFile(DATA_FILE, JSON.stringify({}));
//             return {};
//         }
//         throw error;
//     }
// };

// export const saveLinks = async (links) => {
//     await writeFile(DATA_FILE, JSON.stringify(links));
// };

//AB KARENGE DATABASE SE
 
// import { dbClient } from "../config/db-client.js";
// import { env } from "../config/env.js";

// const db  = dbClient.db(env.MONGODB_DATABASE_NAME);

// const shortenerCollection = db.collection("shorteners");

// import { db } from "../config/db-client.js";

// export const loadLinks = async () =>{
//     // return shortenerCollection.find().toArray(); //mongodb

//    const [rows] = await db.execute("select * from  short_links");
//    return rows;

// }

// export const saveLinks = async({url,shortCode})=>{
//     // return shortenerCollection.insertOne(link); //,MONGODB
//     const [result] = await db.execute("insert into short_links(short_code,url) values(?,?)",[shortCode, url]);
//         return result;
// };

// export const getLinkByShortCode = async(shortcode)=>{
//     // return  await shortenerCollection.findOne({shortCode: shortcode});

//     const [rows] = await db.execute(`select * from short_links where short_code = ?`,[shortcode]);

//     if(rows.length>0){
//         return rows[0];
//     }else{
//         return null;
//     }

// };

import { db } from "../config/drizzleDB.js";
import { shortLink } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

// Get all short links
export const loadLinks = async () => {
  const links = await db.select().from(shortLink);
  return links;
};

// Save a new short link
export const saveLinks = async ({ url, shortCode }) => {
  const result = await db.insert(shortLink).values({
    url,
    shortCode,
  });

  return result;
};

// Get a link by its shortcode
export const getLinkByShortCode = async (shortcode) => {
  const result = await db
    .select()
    .from(shortLink)
    .where(eq(shortLink.shortCode, shortcode));

  return result.length > 0 ? result[0] : null;
};
