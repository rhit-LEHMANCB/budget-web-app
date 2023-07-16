import express from "express";
import { connectToDatabase } from "./services/database.service"
import { usersRouter } from "./routes/users.router";
import { auth, requiresAuth } from "express-openid-connect";
import config from "./config/config";
import * as path from "path";

export const authConfig = {
    authRequired: true,
    auth0Logout: true,
    secret: config.AUTH_SECRET,
    baseURL: config.AUTH_BASE_URL,
    clientID: config.AUTH_CLIENT_ID,
    issuerBaseURL: config.AUTH_ISSUER_BASE_URL
};

const app = express();

const port = config.PORT || 5000;

connectToDatabase()
    .then(() => {
        app.use(express.static(path.join(__dirname, "../src/web/build")));
        app.use("/api/users", usersRouter);
        app.use(auth(authConfig));

        app.get('/profile', (req, res) => {
            res.send(JSON.stringify(req.oidc.user));
        });

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