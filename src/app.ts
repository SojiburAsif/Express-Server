import express, { Request, Response } from "express";
import { Pool } from "pg"
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { useRouter } from "./modules/user/user.route";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRouter } from "./modules/Auth/auth.route";




const app = express();


initDB()

//parser
app.use(express.json())

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Next Sojibur!')
  
});

app.use("/users", useRouter)


app.use("/todos", todoRoutes)

app.use("/auth", authRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Rount not founde"
    })
})


export default app