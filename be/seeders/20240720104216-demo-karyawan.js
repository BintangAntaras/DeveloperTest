'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const karyawans = [];
    const names = [
      'Habib Rahmat', 'Ahmad Fauzi', 'Budi Santoso', 'Citra Dewi',
      'Dian Pratiwi', 'Eko Wijaya', 'Fani Hidayat', 'Gina Sari',
      'Hadi Suprapto', 'Ika Sulastri', 'Joko Santoso', 'Kiki Ramdani',
      'Lia Mardiana', 'Mochamad Rizky', 'Nina Fauziah', 'Oka Yuliana'
    ];
    const jabatan_ids = [
      1, 2, 3, 4, 1, 2, 3, 4,
      1, 2, 3, 4, 1, 2, 3, 4
    ];
    const ages = [
      26, 30, 35, 28, 24, 32, 29, 27,
      31, 25, 33, 28, 26, 34, 29, 30
    ];
    const genders = [
      'L', 'L', 'L', 'P', 'P', 'L', 'P', 'P',
      'L', 'P', 'L', 'P', 'P', 'L', 'P', 'P'
    ];
    const birthDates = [
      new Date(1994, 5, 22), new Date(1990, 7, 15), new Date(1985, 3, 10), new Date(1992, 10, 25),
      new Date(1998, 2, 11), new Date(1991, 8, 30), new Date(1993, 12, 5), new Date(1995, 4, 18),
      new Date(1992, 6, 7), new Date(1997, 11, 20), new Date(1988, 1, 9), new Date(1993, 9, 16),
      new Date(1994, 10, 22), new Date(1989, 7, 3), new Date(1995, 5, 25), new Date(1994, 6, 12)
    ];
    const addresses = [
      'Jl. Alhambra', 'Jl. Sultan Agung', 'Jl. Diponegoro', 'Jl. Ahmad Yani',
      'Jl. Melati', 'Jl. Raya Bogor', 'Jl. Cempaka', 'Jl. Pahlawan',
      'Jl. Jendral Sudirman', 'Jl. Kebon Kacang', 'Jl. Proklamasi', 'Jl. Merdeka',
      'Jl. Kartini', 'Jl. Raya Kuta', 'Jl. Pantai Berawa', 'Jl. Raya Canggu'
    ];

    for (let i = 0; i < names.length; i++) {
        karyawans.push({
          name: names[i],
          jabatan_id: jabatan_ids[i],
          age: ages[i],
          gender: genders[i],
          tanggal_lahir: birthDates[i],
          alamat: addresses[i],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

    return queryInterface.bulkInsert('Karyawans', karyawans);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Karyawans', null, {});
  }
};
