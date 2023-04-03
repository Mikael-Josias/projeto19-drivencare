import handleApplicationErrors from "./middlewares/errorMiddleware.js";
import router from "./routes/index.js";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);
app.use(handleApplicationErrors);

app.listen(process.env.PORT, () => {
    console.log(`SERVER INITIALIZED ON PORT ${process.env.PORT}`);
});