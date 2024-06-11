import { StatusCodes } from 'http-status-codes';
import {
  asyncWrapper,
  checkAuth,
  errorHandler,
} from '../../../middlewares/error';
import { Task } from '../../../models/task';

const handler = asyncWrapper(async (req, res) => {
  let id = req.query.id;
  const auth = await checkAuth(req);
  if (!auth) {
    return errorHandler(res, StatusCodes.UNAUTHORIZED, 'Login First');
  }
  const task = await Task.findById(id);

  if (!task) {
    return errorHandler(res, StatusCodes.BAD_REQUEST, 'Task Not Found');
  }

  if (req.method === 'PUT') {
    if (!id) {
      return errorHandler(
        res,
        StatusCodes.BAD_REQUEST,
        'Please task provide id'
      );
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(StatusCodes.OK).json({
      message: 'Task Updated!',
    });
    
  } else if (req.method === 'DELETE') {
    if (!id) {
      return errorHandler(
        res,
        StatusCodes.BAD_REQUEST,
        'Please task provide id'
      );
    }
    await Task.deleteOne({ _id: id });
    res.status(StatusCodes.OK).json({
      message: 'Task Deleted!',
    });
  }
});

export default handler;
