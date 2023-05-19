// Files imports
import { prisma } from '../../config/config';

// Types imports
import { RequestHandler } from 'express';

export const getNews: RequestHandler<{ stock: string }> = async (req, res) => {
  const stock = req.params.stock;
  if (stock !== 'PETR' && stock !== 'IBOV') {
    res.status(400).json({
      status: 'failed',
      message: 'wrong data sent',
    });
    return;
  }

  if (stock == 'IBOV') {
    const data = prisma.news.findMany({
      select: {
        time: true,
        positive: true,
        negative: true,
        neutral: true,
      },
    });
    res.status(200).json({
      status: 'success',
      data: data,
    });
    return;
  }

  const data = prisma.news.findMany({
    where: {
      tags: {
        has: 'Petrobras',
      },
    },
    select: {
      time: true,
      positive: true,
      negative: true,
      neutral: true,
    },
  });

  res.status(200).json({
    status: 'sucess',
    data: data,
  });
};
