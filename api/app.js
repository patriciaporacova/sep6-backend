import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import dotEnv from "dotenv";
import mysql from 'mysql';
import myConnection from "express-myconnection";

dotEnv.config();

let port = 3257;

const app = express();

app.use(myConnection(mysql, process.env.DATABASE_URL, 'single'));

app.use(cors());
app.use(routes);

app.listen(port, function () {
    console.log("app listening on port: " + port);
});


