import yahooFinance from 'yahoo-finance2';
import { RequestHandler } from 'express';

export const getStock: RequestHandler<
  { stock: string },
  object,
  object,
  { d: '1d' | '1wk' | '1mo' }
> = async (req, res) => {
  const stock = req.params.stock;
  let time = '1d';

  if (req.query.d === '1wk' || req.query.d === '1mo') {
    time = req.query.d;
  }

  try {
    const data = await yahooFinance.historical(stock, { interval: time, period1: '2022-09-01' });
    res.status(200).json({
      status: 'success',
      data: data,
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
