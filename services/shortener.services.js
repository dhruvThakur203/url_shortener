import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();




export const loadLinks = async () =>{
//    const [rows] = await db.execute("select * from  short_links");
//    return rows;

const allShortLinks = await prisma.shortLink.findMany();
return allShortLinks;

};


export const getLinkByShortCode = async(shortcode)=>{
    // return  await shortenerCollection.findOne({shortCode: shortcode});

    // const [rows] = await db.execute(`select * from short_links where short_code = ?`,[shortcode]);
    
    const shortLink = await prisma.shortLink.findUnique({
        where : { shortCode : shortcode},
    });

    return shortLink;
   
};

export const saveLinks = async({url,shortCode})=>{
    // return shortenerCollection.insertOne(link); //,MONGODB
//     const [result] = await db.execute("insert into short_links(short_code,url) values(?,?)",[shortCode, url]);
//         return result;

const newShortLink = await prisma.shortLink.create({
    data : {shortCode,url}
});

return newShortLink;
};