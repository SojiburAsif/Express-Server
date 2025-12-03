import express, { Request, Response } from "express";
import { Pool } from "pg"
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { useRouter } from "./modules/user/user.route";



const app = express();
const port = config.port

initDB()

//parser
app.use(express.json())

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Next Sojibur!');
});

app.use("/users", useRouter)



app.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`,
            [req.params.id]
        );
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
})


app.put("/users/:id", async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const result = await pool.query(`
            UPDATE users SET name=$1 , email=$2 WHERE id=$3 RETURNING *`,
            [name, email, req.params.id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({
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
})

// todous CRUD  
app.post("/todos", async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO todos(user_id, title)
             VALUES($1, $2)
             RETURNING *`,
            [user_id, title]
        );

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: result.rows[0]
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Rount not founde"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
