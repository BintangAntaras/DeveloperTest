'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jabatan.belongsTo(models.Department, {
        foreignKey: 'department_id',
        as: 'department'
      });

      Jabatan.hasMany(models.Karyawan, {
        foreignKey: 'jabatan_id',
        as: 'karyawan'
      });
    }
  }
  Jabatan.init({
    name: DataTypes.STRING,
    department_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jabatan',
  });
  return Jabatan;
};