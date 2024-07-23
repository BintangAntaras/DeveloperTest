const Jabatan = require('../models').Jabatan;
const Department = require('../models').Department;

module.exports = {
    findAll(req, res) {
      return Jabatan
        .findAll({
            include: [{
                model: Department,
                as: 'department'
            }],
        })
        .then((jabatan) => res.status(200).send(jabatan))
        .catch((error) => { res.status(400).send(error); });
    },
  
    findOne(req, res) {
      return Jabatan
        .findByPk(req.params.id, {
            include: [{
              model: Department,
              as: 'department'
            }],
          })
        .then((jabatan) => {
          if (!jabatan) {
            return res.status(404).send({
              message: 'Jabatan Not Found',
            });
          }
          return res.status(200).send(user);
        })
        .catch((error) => res.status(400).send(error));
    },
  
    create(req, res) {
      return Jabatan
        .create({
          name: req.body.name,
          department_id: req.body.department_id,
        })
        .then((jabatan) => res.status(201).send(jabatan))
        .catch((error) => res.status(400).send(error));
    },
  
    update(req, res) {
      return Jabatan
        .findByPk(req.params.id)      
        .then(jabatan => {
          if (!jabatan) {
            return res.status(404).send({
              message: 'Jabatan Not Found',
            });
          }
          return jabatan
            .update({
              name: req.body.name || jabatan.name,
            })
            .then(() => res.status(200).send(jabatan))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
  
    delete(req, res) {
      return Jabatan
        .findByPk(req.params.id)
        .then(jabatan => {
          if (!jabatan) {
            return res.status(400).send({
              message: 'Jabatan Not Found',
            });
          }
          return jabatan
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    findByDepartment(req, res) {
        return Jabatan
          .findAll({
            where: {
              department_id: req.params.department_id
            },
            include: [{
              model: Department,
              as: 'department'
            }],
          })
          .then((jabatan) => {
            if (!jabatan) {
              return res.status(404).send({
                message: 'No Jabatan found for the given department',
              });
            }
            return res.status(200).send(jabatan);
          })
          .catch((error) => res.status(400).send(error));
    },
  }