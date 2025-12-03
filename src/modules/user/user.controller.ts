import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email } = (req.body);

    try {
        const resule = await userServices.createUser(name, email);

        return res.status(201).json({
            success: true,
            message: "User inserted successfully",
            data: resule.rows[0]
        })

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const getuser = async (req: Request, res: Response) => {
    try {
        const resule = await pool.query("SELECT * FROM users");

        res.status(201).json({
            success: true,
            message: "users Retrived successgully",
            data: resule.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
}
export const userControler = { createUser, getuser }