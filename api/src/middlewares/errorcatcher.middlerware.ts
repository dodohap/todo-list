import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exeptions/http.exception";

export const errorCatcher = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error + ", " + "Request path: " + req.path);

  let errorMessage = "Something went wrong!";
  let errorStatus = 500;
  if (error instanceof HttpException) {
    errorMessage = error.message;
    errorStatus = error.status;
  }

  res.status(errorStatus).json({ error: errorMessage });
  next();
};
