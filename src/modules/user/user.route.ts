import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControler } from "./user.controller";

const router = express.Router()

router.post("/", userControler.createUser)

router.get("/", userControler.getuser )


export const useRouter = router