import { db } from "../config/drizzleDB.js";
import { eq } from "drizzle-orm";
import { shortLink } from "../drizzle/schema.js";


export const getAllShortLinks = async() =>{
    return await db.select().from(shortLink);
};

export const getShortLinkByShortCode = async(shortCode) =>{
   const [result] = await db.select().from(shortLink).where(eq(shortLink.shortCode,shortCode));
    return result;
}

export const insertShortLink = async({url,finalShortCode})=>{
    await db.insert(shortLink).values({url,shortCode : finalShortCode});
}
