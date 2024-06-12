import { StatusCodes } from 'http-status-codes';
import {
  asyncWrapper,
  checkAuth,
  errorHandler,
} from '../../../../middlewares/error';
import { Task } from '../../../../models/task';

const handler = asyncWrapper(async (req, res) => {
  let id = req.query.id;
  const { title, description } = req.body;
  const auth = await checkAuth(req);
  if (!auth) {
    return errorHandler(res, StatusCodes.UNAUTHORIZED, 'Login First');
  }
  const task = await Task.findById(id);

  if (!task) {
    return errorHandler(res, StatusCodes.BAD_REQUEST, 'Task Not Found');
  }

  task.title = title;
  task.description = description;

  await task.save();
  res.status(StatusCodes.OK).json({
    message: 'Task Updated!',
    task,
  });
});
export default handler;
