import express from "express";
import { connectToDatabase } from "./services/database.service"
import { usersRouter } from "./routes/users.router";
import * as path from "path";
import config from "./config/config";

const app = express();

const port = config.PORT || 5000;

connectToDatabase()
    .then(() => {
        app.use(express.static(path.join(__dirname, "../src/web/build")));
        app.use("/api/users", usersRouter);

        app.get("*", (req, res) => {
            res.sendFile(
                path.join(__dirname, "../src/web/build/index.html")
            );
        });

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });