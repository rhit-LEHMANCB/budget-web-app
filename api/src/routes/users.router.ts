// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../../../models/user";
// Global Config
export const usersRouter = express.Router();

usersRouter.use(express.json());
// GET
usersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await collections.users?.find({}).toArray() as unknown as User[];

        res.status(200).send(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
// POST

// PUT

// DELETE