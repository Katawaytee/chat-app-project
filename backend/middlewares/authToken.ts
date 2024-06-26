import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';
import generateStatusResponse from '../lib/statusResponseGenerator';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const {auth} = req.cookies
    const token = auth;
    if (token == null) return res.status(401).send(generateStatusResponse(401))

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, async (err: any, user: any) => {

        if(err && token) {
            res.clearCookie("auth");
        }
        
        if (err) return res.status(401).send(generateStatusResponse(401))

        const userQuery = await db.user.findUnique({
            where: {
                id: user.id
            }
        })
    
        if (!user) {
            res.status(401).send(generateStatusResponse(401))
            return
        }
    
        req.body.user = {
            ...user,
            ...userQuery
        }

        next()
    })
}