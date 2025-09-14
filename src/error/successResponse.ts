import type { Response } from "express";

interface SuccessResponse<T> {
  status: "success";
  message: string;
  data: T;
}

export const sendSuccess = <T>({
  res,
  data,
  message = "Request successful",
  statusCode = 200,
}: {
  res: Response;
  data: T;
  message?: string;
  statusCode?: number;
}) => {
  const response: SuccessResponse<T> = {
    status: "success",
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

