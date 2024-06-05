import { StatusCodes } from 'http-status-codes';
import { asyncWrapper, errorHandler } from '../../../middlewares/error';
import { User } from '../../../models/user';
import bcrypt from 'bcrypt';
import {
  ConnectDB,
  cookieSetter,
  ganerateToken,
} from '../../../utils/connectDb';

const handler = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorHandler(
      res,
      StatusCodes.BAD_REQUEST,
      'Please provide  email and password'
    );
  }
  await ConnectDB();
  if (req.method === 'GET') {
    return errorHandler(res, StatusCodes.BAD_REQUEST, 'Get Method not allowed');
  }

  const user = await User.findOne({ email });
  if (!user) {
    return errorHandler(
      res,
      StatusCodes.BAD_REQUEST,
      'Invalid email and password'
    );
  }
  const isMatched = await bcrypt.compare(password, user?.password);

  if (!isMatched) {
    return errorHandler(
      res,
      StatusCodes.BAD_REQUEST,
      'Invalid email and password'
    );
  }
  const token = ganerateToken(user._id);

  cookieSetter(res, token, true);
  res.status(StatusCodes.OK).json({
    message: `Welcome back ${user?.name}`,
    // data: user,
    token,
  });
});

export default handler;
