import type { Request, Response, NextFunction } from 'express';

// generic error handler
type ErrorResponse = {
  message: string;
  code?: number;
  ok?: boolean;
};

type ErrorMiddleware = {
  (err: ErrorResponse, req: Request, res: Response, next: NextFunction): void
}

export let apiErrorMiddleware: ErrorMiddleware = ({ code, message, ok = false }, _, res, __) => {
  res.status(code || 500).json({
    ok,
    error: message,
  });
}

export let templateErrorMiddleware: ErrorMiddleware = ({ code, message }, _, res, __) => {
  res.render('error', {
    code,
    message
  })
}