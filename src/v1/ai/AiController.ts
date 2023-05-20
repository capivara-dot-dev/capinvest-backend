// Packages imports
import axios from 'axios';

// Files imports
import { env } from '../../config/config';

// Types imports
import { RequestHandler } from 'express';
import { MakePredBody } from '../../types';

export const makePred: RequestHandler<object, object, MakePredBody> = async (req, res) => {
  if (req.body.instances == undefined) {
    return res.status(400).json({
      status: 'failed',
      message: 'missing necessary information',
    });
  }

  const instances = req.body.instances;

  try {
    const data = await axios.post(env.AI.URL as string, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.AI.TOKEN}`,
      },
      body: JSON.stringify({ instances }),
    });

    const json = data.data;
    res.status(200).json({
      status: 'success',
      data: json,
    });
  } catch (e: any) {
    console.error(e.data);
    return res.status(500).json({
      status: 'error',
      message: 'internal api problem, please try again',
      error: e,
    });
  }
};
