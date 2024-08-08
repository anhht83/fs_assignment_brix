const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
import vars from "../config/vars";
import config from "../config/sequelize";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const sequelizeConfig = config[vars.env]
const basename = path.basename(__filename);
const db: any = {};
const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, sequelizeConfig);

fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
