import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncWrapper = (asyncFn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        asyncFn(req, res, next).catch((err: Error) => {
            next(err);
        });
    };
};
