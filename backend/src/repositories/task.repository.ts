import BaseRepository from "./base.repository";
import models from "../models";

class TaskRepository extends BaseRepository {
  static get model() {
    return models.Task;
  }
}

export default TaskRepository;
