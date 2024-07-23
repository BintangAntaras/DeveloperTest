const Department = require('../models').Department;

module.exports = {
  findAll(req, res) {
    return Department
      .findAll()
      .then((department) => res.status(200).send(department))
      .catch((error) => { res.status(400).send(error); });
  },

  findOne(req, res) {
    return Department
      .findByPk(req.params.id)
      .then((department) => {
        if (!department) {
          return res.status(404).send({
            message: 'Department Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return Department
      .create({
        name: req.body.name,
      })
      .then((department) => res.status(201).send(department))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Department
      .findByPk(req.params.id)      
      .then(department => {
        if (!department) {
          return res.status(404).send({
            message: 'Department Not Found',
          });
        }
        return department
          .update({
            name: req.body.name || department.name,
          })
          .then(() => res.status(200).send(department))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Department
      .findByPk(req.params.id)
      .then(department => {
        if (!department) {
          return res.status(400).send({
            message: 'Department Not Found',
          });
        }
        return department
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
}