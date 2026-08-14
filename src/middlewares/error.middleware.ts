import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  ZodError
} from "zod";

import {
  AppError,
  InternalServerError,
  BadRequestError
} from "../utils/errors/app.error.js";


export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  // Zod validation error
  if (error instanceof ZodError) {

    const validationError =
      new BadRequestError(
        "Validation failed",
        error.issues
      );

    return res.status(
      validationError.statusCode
    ).json({
      success: false,
      message: validationError.message,
      details: validationError.details
    });
  }


  // Custom application error
  if (error instanceof AppError) {

    return res.status(
      error.statusCode
    ).json({
      success: false,
      message: error.message,
      details: error.details
    });
  }


  // Unknown / unexpected error
  const serverError =
    new InternalServerError(
      "Something went wrong",
      error instanceof Error
        ? error.message
        : error
    );

  return res.status(
    serverError.statusCode
  ).json({
    success: false,
    message: serverError.message,
    details: serverError.details
  });
};