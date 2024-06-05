import { asyncWrapper } from '../../../middlewares/error';

const handler = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
      


});

export default handler;
