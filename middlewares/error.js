import { StatusCodes } from 'http-status-codes';

export const errorHandler = (res, code, message) => {
  return res.status(code).json({
    success: false,
    message,
  });
};

export const asyncWrapper = (passFunc) => (req, res) => {
  return Promise.resolve(passFunc(req, res)).catch((error) => {
    return errorHandler(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  });
};
