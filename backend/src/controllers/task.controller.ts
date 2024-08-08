import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import TaskRepository from "../repositories/task.repository";
import { Op } from 'sequelize'
class TaskController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const entity = await TaskRepository.create(req.body);
      return res.status(httpStatus.CREATED).json(entity);
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await TaskRepository.destroy({
        where: {id}
      });
      return res.json(true);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {body, params} = req
      const entity = await TaskRepository.update({
        task: body.task
      }, {
        where: {id: params.id}
      });
      return res.json(entity);
    } catch (error) {
      return next(error);
    }
  }

  static async batchChangeItemsStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const {body} = req
      if((body.ids || []).includes(0)){
        await TaskRepository.update({
          isCompleted: body.isCompleted
        }, {where: {}});
      }else {
        await TaskRepository.update({
          isCompleted: body.isCompleted
        }, {
          where: {
            id: {
              [Op.in]: body.ids
            }
          }
        });
      }
      return res.json(true);
    } catch (error) {
      return next(error);
    }
  }


  static async clearCompletedItems(req: Request, res: Response, next: NextFunction) {
    try {
      await TaskRepository.destroy({
        where: {isCompleted: true}
      });
      return res.json(true);
    } catch (error) {
      return next(error);
    }
  }


  static async filter(req: Request, res: Response, next: NextFunction) {
    try {
      const {isCompleted} = req.query;
      let entities = [];

      if(isCompleted === 'true'){
        entities = await TaskRepository.findAll({ where: {isCompleted: true}});
      }else if(isCompleted === 'false'){
        entities = await TaskRepository.findAll({ where: {isCompleted: {[Op.ne]: true}}});
      }else{
        entities = await TaskRepository.findAll();
      }
      const count = await TaskRepository.count();
      return res.json({
        records: entities,
        count
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default TaskController;
