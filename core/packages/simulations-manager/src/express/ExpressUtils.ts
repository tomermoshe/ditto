import { Request, Response, NextFunction } from "express";


export const handleErrorAsync = (func: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await func(req, res, next);
    } catch (error) {
        next(error);
    }
};