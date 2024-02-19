import { Request } from 'express';

export const getUserId = async (req: Request) =>
  req.user['_id'] ? req.user['_id'] : req.user['id'];
