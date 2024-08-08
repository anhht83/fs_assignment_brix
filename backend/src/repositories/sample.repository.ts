import BaseRepository from "./base.repository";
import models from "../models";

class SampleRepository extends BaseRepository {
  static get model() {
    return models.Sample;
  }
}

export default SampleRepository;
