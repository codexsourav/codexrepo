import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import env from "dotenv";
import connectDB from './db/db.js';
import middleware from './middleware/middleware.js';
import UploadFile from './helper/UploadFile.js';

const app: express.Express = express();
env.config();

const initApp = () => {

    const port = process.env.PORT || 8000;

    app.use(
        cors(),
        express.static("static"),
        express.static("static/uploads"),
        express.json(),
        express.urlencoded({ extended: true }),
        cookieParser(),
    );

    connectDB().then(() => {
        app.listen(port, () => {
            console.log(`Server listening at Port - ${process.env.PORT}`);
        });
    }).catch((e) => {
        console.log("App Start Error", e);
    });

}

app.post("/upload", middleware, UploadFile.single("file"), async (req: Request, res: Response) => {
    res.send(req.file)
});

app.get("/heath", async (req: Request, res: Response) => {
    res.send({ "message": "Everything is Healthy" });
});

app.get("/", async (req: Request, res: Response) => {
    res.send({
        "message": "Hi Welcome to Bid And Shops Api"
    });
});

initApp();
