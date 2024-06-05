import { serialize } from 'cookie';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
export const ConnectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${connection.host}`);
};

export const cookieSetter = (res, token, set) => {
  res.setHeader(
    'Set-Cookie',
    serialize('token', set ? token : '', {
      path: '/',
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export const ganerateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SCERET);
};
