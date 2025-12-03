import express, { Request, Response } from "express";
import { userControler } from "./user.controller";

const router = express.Router()

router.post("/", userControler.createUser)
router.get("/", userControler.getuser)
router.get("/:id", userControler.getsingleUser)
router.put("/:id", userControler.UpdateSingUser)
router.delete("/:id", userControler.DeleteUser)

export const useRouter = router