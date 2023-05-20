// Files imports
import { prisma } from '../../config/config';

// Types imports
import { RequestHandler } from 'express';
import { PredictionByDate } from '../../types';

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
    try {
      const data = await prisma.prediction.findMany({
        select: {
          positive: true,
          negative: true,
          neutral: true,
          total: true,
          score: true,
          news: {
            select: {
              date: true,
            },
          },
        },
      });

      const predictionsByDate = data.reduce((result: PredictionByDate[], prediction) => {
        const date = prediction.news.date.toISOString().slice(0, 10);
        const existingPrediction = result.find((item) => item.date === date);

        if (existingPrediction) {
          existingPrediction.total++;
          existingPrediction.score += prediction.score;
        } else {
          result.push({
            date,
            total: 1,
            score: prediction.score,
          });
        }

        return result;
      }, []);

      const results = predictionsByDate.map((prediction) => ({
        date: prediction.date,
        score: prediction.score / prediction.total,
      }));

      res.status(200).json({
        status: 'success',
        data: results,
      });

      return;
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        message: 'internal api probleam, please try again',
        error: e,
      });
    }
  }

  try {
    const data = await prisma.prediction.findMany({
      where: {
        news: {
          tags: {
            has: 'Petrobras',
          },
        },
      },
      select: {
        positive: true,
        negative: true,
        neutral: true,
        total: true,
        score: true,
        news: {
          select: {
            date: true,
          },
        },
      },
    });

    const predictionsByDate = data.reduce((result: PredictionByDate[], prediction) => {
      const date = prediction.news.date.toISOString().slice(0, 10);
      const existingPrediction = result.find((item) => item.date === date);

      if (existingPrediction) {
        existingPrediction.total++;
        existingPrediction.score += prediction.score;
      } else {
        result.push({
          date,
          total: 1,
          score: prediction.score,
        });
      }

      return result;
    }, []);

    const results = predictionsByDate.map((prediction) => ({
      date: prediction.date,
      score: prediction.score / prediction.total,
    }));

    res.status(200).json({
      status: 'success',
      data: results,
    });

    return;
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'internal api probleam, please try again',
      error: e,
    });
  }
};
