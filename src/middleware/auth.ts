import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            console.log({ authTokken: token });
            if (!token) {
                return res.status(500).json({ message: "Not valid User" })
            }
            const decoded = jwt.verify(token, config.jwttoken as string) as JwtPayload
            console.log(decoded);
            req.user = decoded ;
            //["admin"]
            if (roles.length && !roles.includes(decoded.role as string)) {
                return res.status(500).json({
                    error: "unauthorized!!!",
                });
            }

            next()
        } catch (err: any) {
            res.status(500).json({
                succes: false,
                message: err.message
            })
        }
    }
}
export default auth