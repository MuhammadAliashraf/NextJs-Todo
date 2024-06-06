import { StatusCodes } from 'http-status-codes';
import { asyncWrapper, checkAuth } from '../../middlewares/error';
import { ConnectDB } from '../../utils/connectDb';
import { Task } from '../../models/task';

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
  // return console.log('I Got Hit', auth._id);
  const alltask = await Task.find({ user: auth._id }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    data: alltask,
  });
});

export default handler;
