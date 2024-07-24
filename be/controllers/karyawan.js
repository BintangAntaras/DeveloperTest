const Karyawan = require('../models').Karyawan;
const Jabatan = require('../models').Jabatan;
const Department = require('../models').Department;

module.exports = {
    findAll(req, res) {
      return Karyawan
        .findAll({
            include: [{
                model: Jabatan,
                as: 'jabatan',
                include: [{
                    model: Department,
                    as: 'department'
                  }]
            }],
            order: [['createdAt', 'DESC']],
        })
        .then((karyawan) => res.status(200).send(karyawan))
        .catch((error) => { res.status(400).send(error); });
    },
  
    findOne(req, res) {
      return Karyawan
        .findByPk(req.params.id, {
            include: [{
              model: Jabatan,
              as: 'jabatan'
            }],
          })
        .then((karyawan) => {
          if (!karyawan) {
            return res.status(404).send({
              message: 'Karyawan Not Found',
            });
          }
          return res.status(200).send(user);
        })
        .catch((error) => res.status(400).send(error));
    },
  
    create(req, res) {
      return Karyawan
        .create({
          name: req.body.name,
          jabatan_id: req.body.jabatan_id,
          age: req.body.age,
          gender: req.body.gender,
          tanggal_lahir: req.body.tanggal_lahir,
          alamat: req.body.alamat,
        })
        .then((karyawan) => res.status(201).send(karyawan))
        .catch((error) => res.status(400).send(error));
    },
  
    update(req, res) {
      return Karyawan
        .findByPk(req.params.id)      
        .then(karyawan => {
          if (!karyawan) {
            return res.status(404).send({
              message: 'Karyawan Not Found',
            });
          }
          return karyawan
            .update({
              name: req.body.name || karyawan.name,
              jabatan_id: req.body.jabatan_id || karyawan.jabatan_id,
              age: req.body.age || karyawan.age,
              gender: req.body.gender || karyawan.gender,
              tanggal_lahir: req.body.tanggal_lahir || karyawan.tanggal_lahir,
              alamat: req.body.alamat || karyawan.alamat,
            })
            .then(() => res.status(200).send(karyawan))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
  
    delete(req, res) {
      return Karyawan
        .findByPk(req.params.id)
        .then(karyawan => {
          if (!karyawan) {
            return res.status(400).send({
              message: 'Karyawan Not Found',
            });
          }
          return karyawan
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
  }