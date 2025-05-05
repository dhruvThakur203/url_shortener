import { readFile, writeFile } from "fs/promises";
import { Router } from "express";
import { postURLShortener,getShortener,redirectToShortLink  } from "../controllers/postshortener.controller.js";

const router = Router();




// const serveFile = async (res, filePath, contentType) => {
//     try {
//         const data = await readFile(filePath);
//         res.writeHead(200, { "Content-Type": contentType });
//         res.end(data);
//     } catch (error) {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("404 page not found");
//     }
// };


router.get("/",getShortener);

// router.get("/report", (req, res) => {
//     const student = [
//         {
//           name: "Aarav",
//           grade: "10th",
//           favoriteSubject: "Mathematics"
//         },
//         {
//           name: "Ishita",
//           grade: "9th",
//           favoriteSubject: "Science"
//         },
//         {
//           name: "Rohan",
//           grade: "8th",
//           favoriteSubject: "History"
//         },
//         {
//           name: "Meera",
//           grade: "10th",
//           favoriteSubject: "English"
//         },
//         {
//           name: "Kabir",
//           grade: "11th",
//           favoriteSubject: "Physics"
//         }
//       ];
      
//     return res.render("report",{student});
// });

router.post("/",postURLShortener);


router.get("/:shortCode", redirectToShortLink );

// export default router;

//named exports for bigger prpjects
export const shortenerRoutes = router;

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
