import { StatusCodes } from 'http-status-codes';
import {
  asyncWrapper,
  checkAuth,
  errorHandler,
} from '../../../middlewares/error';
import { ConnectDB } from '../../../utils/connectDb';

const handler = asyncWrapper(async (req, res) => {
  if (req.method !== 'GET') {
    return errorHandler(
      res,
      StatusCodes.BAD_REQUEST,
      'Get Method allowed  only!'
    );
  }
  await ConnectDB();
  const auth = await checkAuth(req);
  const { password, ...withOutPassword } = auth._doc || auth;

  if (!auth) {
    return errorHandler(res, StatusCodes.UNAUTHORIZED, 'Login First');
  }
  res.status(StatusCodes.OK).json({
    data: withOutPassword,
  });
});

export default handler;
