import { StatusCodes } from 'http-status-codes';
import { asyncWrapper, errorHandler } from '../../../middlewares/error';
import { User } from '../../../models/user';
import {
  ConnectDB,
  cookieSetter,
  ganerateToken,
} from '../../../utils/connectDb';

import bcrypt from 'bcrypt';

const handler = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return errorHandler(
      res,
      StatusCodes.BAD_REQUEST,
      'Please provide name, email and password'
    );
  }
  if (req.method === 'GET') {
    return errorHandler(res, StatusCodes.BAD_REQUEST, 'Get Method not allowed');
  }

  await ConnectDB();
  let user = await User.findOne({ email });
  if (user) {
    return errorHandler(
      res,    
      StatusCodes.CONFLICT,
      'User is already register with the given email'
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = ganerateToken(user._id);
  //Setting Up Cookei
  cookieSetter(res, token, true);

  res.status(StatusCodes.CREATED).json({
    message: 'User Created',
    data: user,
    token,
  });
});

export default handler;
