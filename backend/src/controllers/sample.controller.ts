import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import SampleRepository from "../repositories/sample.repository";

class SampleController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const entity = await SampleRepository.create(req.body);
      return res.status(httpStatus.CREATED).json(entity);
    } catch (error) {
      return next(error);
    }
  }
}

export default SampleController;
