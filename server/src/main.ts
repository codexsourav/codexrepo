import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import env from "dotenv";
import connectDB from './db/db.js';
import middleware from './middleware/middleware.js';
import UploadFile from './helper/UploadFile.js';
import { AdminRouter } from './routes/admin.js'
import { ExploreRouts } from './routes/explore.js';
import { AuthRouts } from './routes/auth.js';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const clint_path: string = path.join(__dirname, "../dist");

const app: express.Express = express();
env.config();
app.use(
    cors(),
    express.static("static"),
    express.static("dist"),
    express.static("static/uploads"),
    express.json(),
    cookieParser(),
    express.urlencoded({ extended: true }),
    AdminRouter,
    ExploreRouts,
    AuthRouts
);


const port = process.env.PORT || 8000;



connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server listening at Port - ${process.env.PORT}`);
    });
}).catch((e) => {
    console.log("App Start Error", e);
});



app.post("/upload", UploadFile.single("file"), async (req: Request, res: Response) => {
    res.send(req.file)
});

app.get("/heath", async (req: Request, res: Response) => {
    res.send({ "message": "Everything is Healthy" });
});

app.get("/*", async (req: Request, res: Response) => {
    return res.sendFile(path.join(clint_path, 'index.html'));

});


