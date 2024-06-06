import { StatusCodes } from 'http-status-codes';
import { asyncWrapper, errorHandler } from '../../../middlewares/error';
import {
    cookieSetter
} from '../../../utils/connectDb';

const handler = asyncWrapper(async (req, res) => {
  if (req.method !== 'GET') {
    return errorHandler(
      res,
      StatusCodes.BAD_REQUEST,
      'Only Get Method allowed'
    );
  }
  cookieSetter(res, null, false);
  res.status(StatusCodes.OK).json({
    message: `Logout Successfully!`,
  });
});

export default handler;
