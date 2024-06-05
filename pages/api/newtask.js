import { ConnectDB } from '../../utils/connectDb';

const handler = async (req, res) => {
  await ConnectDB();
  res.json({
    message: 'New Task Added',
  });
};

export default handler;
