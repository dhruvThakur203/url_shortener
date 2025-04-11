import { readFile, writeFile } from "fs/promises";
import { createServer } from "https";
import crypto from "crypto";
import path from "path";
import express from "express";
import { url } from "inspector";

const app = express();



// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
       

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join("data", "links.json");

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


const serveFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 page not found");
    }
};

const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
};

const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links));
};

app.get("/",async(req,res)=>{
    try{
        const file = await readFile(path.join("views","index.html"));
        const links = await loadLinks();

        const content = file.toString().replaceAll("{{shortened_urls}}",Object.entries(links).map(([shortCode,url])=>`<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a> - ${url}</li>`).join("")
    );

    return res.send(content);
    }
    catch(error){
        console.error(error);
        return res.status(500).send("internal server error");
    }
});

app.post("/",async(req,res)=>{
    try{
        const {url,shortCode} = req.body;
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        const links = await loadLinks();

        if (links[finalShortCode]){
           return  res.status(400).send("Short code already exists. Please choose another.");
        }

        links[finalShortCode] = url;

        await saveLinks(links);

        return res.redirect("/");

    } catch(error){

    }
})

app.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;
        const links = await loadLinks();

        if (!links[shortCode])
            return res.status(404).send("404 error occurred");

        return res.redirect(links[shortCode]);
    } catch (err) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
});


//using node
// const server = createServer(async (req, res) => {
//     console.log(req.url);
//     if (req.method === "GET") {
//         if (req.url === "/") {
//             return serveFile(res, path.join(__dirname, "public", "index.html"), "text/html");
//         } else if (req.url === "/style.css") {
//             return serveFile(res, path.join(__dirname, "public", "style.css"), "text/css");
//         } else if (req.url === "/links") {
//             const links = await loadLinks();
//             res.writeHead(200, { "Content-Type": "application/json" });
//             return res.end(JSON.stringify(links));
//         } else {
//             const links = await loadLinks();
//             const shortCode = req.url.slice(1);
//             if (links[shortCode]) {
//                 res.writeHead(302, { Location: links[shortCode] });
//                 return res.end();
//             }
//             res.writeHead(404, { "Content-Type": "text/plain" });
//             return res.end("Shortened URL not found");
//         }
//     }

//     // if (req.method === "POST" && req.url === "/shorten") {
//     //     let body = "";
//     //     req.on("data", (chunk) => (body += chunk));
//     //     req.on("end", async () => {
//     //         try {
//     //             const { url, shortCode } = JSON.parse(body);

//     //             if (!url) {
//     //                 res.writeHead(400, { "Content-Type": "text/plain" });
//     //                 return res.end("URL is required");
//     //             }

//     //             const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

//     //             const links = await loadLinks();

//     //             if (links[finalShortCode]) {
//     //                 res.writeHead(400, { "Content-Type": "text/plain" });
//     //                 return res.end("ShortCode already exists. Please choose another.");
//     //             }

//     //             links[finalShortCode] = url;

//     //             await saveLinks(links);

//     //             res.writeHead(200, { "Content-Type": "application/json" });
//     //             res.end(JSON.stringify({ success: true, shortCode: finalShortCode }));
//     //         } catch (error) {
//     //             res.writeHead(500, { "Content-Type": "text/plain" });
//     //             res.end("Internal Server Error");
//     //         }
//     //     });
//     // }
// });

// server.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running at http://0.0.0.0:${PORT}`);
// });

app.listen(PORT,  () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

