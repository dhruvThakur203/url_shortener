import {shortenerRoutes} from "./routes/shortener.routes.js";
import express from "express";
import { url } from "inspector";




const app = express();



// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
       

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


app.set("view engine","ejs");

// express router
app.use(shortenerRoutes);


app.listen(PORT,  () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

