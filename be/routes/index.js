var express = require('express');
var router = express.Router();

const departmentController = require('../controllers').department;
const jabatanController = require('../controllers').jabatan;
const karyawanController = require('../controllers').karyawan;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/department', departmentController.findAll);
router.get('/api/department/:id', departmentController.findOne);
router.post('/api/department', departmentController.create);
router.put('/api/department/:id', departmentController.update);
router.delete('/api/department/:id', departmentController.delete);

router.get('/api/jabatan', jabatanController.findAll);
router.get('/api/jabatan/:id', jabatanController.findOne);
router.post('/api/jabatan', jabatanController.create);
router.put('/api/jabatan/:id', jabatanController.update);
router.delete('/api/jabatan/:id', jabatanController.delete);
router.get('/api/jabatan/department/:department_id', jabatanController.findByDepartment);

router.get('/api/karyawan', karyawanController.findAll);
router.get('/api/karyawan/:id', karyawanController.findOne);
router.post('/api/karyawan', karyawanController.create);
router.put('/api/karyawan/:id', karyawanController.update);
router.delete('/api/karyawan/:id', karyawanController.delete);

module.exports = router;
