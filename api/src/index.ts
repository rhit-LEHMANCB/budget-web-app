import express from "express";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service"
import { usersRouter } from "./routes/users.router";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

connectToDatabase()
    .then(() => {
        app.use("/users", usersRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });