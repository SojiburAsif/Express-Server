import { Request, Response } from "express";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    const { name, email } = (req.body);

    try {
        const resule = await userServices.createUser(req.body);

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
        const result = await userServices.getuser();

        res.status(201).json({
            success: true,
            message: "users Retrived successgully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
}

const getsingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })

    }
}

const UpdateSingUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const result = await userServices.updateSingleuser(name, email, req.params.id!)

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })

    }
}

const DeleteUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await userServices.deleteUser(req.params.id!)

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows,
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const userControler = { createUser, getuser, getsingleUser, UpdateSingUser, DeleteUser }