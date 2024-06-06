import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

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

export const checkAuth = async (req) => {
  const token = req.headers.cookie.split('=')[1];
  const decodeData = jwt.verify(token, process.env.JWT_SCERET);
  return await User.findById(decodeData._id);
};
