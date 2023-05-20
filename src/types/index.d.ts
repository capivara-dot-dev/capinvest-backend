export interface MakePredBody {
  instances: Array<Array<string>>;
}

export interface PredictionByDate {
  date: string;
  total: number;
  score: number;
}
