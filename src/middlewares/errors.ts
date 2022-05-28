import type { express } from '../vendor/index';

// generic error handler
type ErrorResponse = {
  message: string;
  code?: number;
  ok?: boolean;
};

type ErrorMiddleware = {
  (err: ErrorResponse, req: express.Request, res: express.Response, next: express.NextFunction): void
}

export let apiErrorMiddleware: ErrorMiddleware = ({ code, message, ok = false }, _, res, next) => {
  res.status(code || 500).json({
    ok,
    error: message,
  });
}