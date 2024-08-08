import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
    declare id: CreationOptional<number>;
    declare task: string;
    declare isCompleted: boolean;

  }

  Task.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    task: DataTypes.STRING,
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: "Tasks",
    modelName: "Task"
  });

  return Task;
}
