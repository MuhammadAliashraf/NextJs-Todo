import { ConnectDB } from '../../utils/connectDb';
import { Task } from '../../models/task';
import { StatusCodes } from 'http-status-codes';
import { asyncWrapper, errorHandler } from '../../middlewares/error';

const handler = asyncWrapper(async (req, res) => {
  if (req.method !== 'POST') {
    return errorHandler(
      res,
      StatusCodes.BAD_REQUEST,
      'Post Method not allowed'
    );
  }
  const { title, description } = req.body;
  await ConnectDB();
  const task = {
    title,
    description,
    user: '662411dbb0adc62be77c3b4a',
  };
  await Task.create(task);
  res.status(StatusCodes.CREATED).json({
    message: 'Task Created',
    data: task,
  });
});

export default handler;
