import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/algorithm', async (req: Request, res: Response): Promise<any> => {
  try {
    const { inputData } = req.body;

    if (!inputData) {
      return res.status(400).json({ error: 'Input data is required' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error executing algorithm:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
