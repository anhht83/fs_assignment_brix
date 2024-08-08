import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Sample extends Model<InferAttributes<Sample>, InferCreationAttributes<Sample>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare slug: string;

    static associate (models: any){
      /*
      this.belongsTo(models.User, {
        foreignKey: "userId"
      });
       */
    }
  }

  Sample.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    tableName: "Samples",
    modelName: "Sample"
  });

  return Sample;
}
