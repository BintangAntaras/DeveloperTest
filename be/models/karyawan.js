'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Karyawan.belongsTo(models.Jabatan, {
        foreignKey: 'jabatan_id',
        as: 'jabatan'
      });
    }
  }
  Karyawan.init({
    name: DataTypes.STRING,
    jabatan_id: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM('L', 'P'),
    tanggal_lahir: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Karyawan',
  });
  return Karyawan;
};