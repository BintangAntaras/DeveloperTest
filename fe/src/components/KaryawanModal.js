import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createKaryawan, fetchKaryawanList, updateKaryawan, updateFormData, clearFormData } from "../store/karyawanSlice";
import { fetchDepartmentList } from "../store/departmentSlice";
import { fetchJabatanByDepartment } from "../store/jabatanSlice";

const KaryawanModal = ({ onClose, type, karyawanId }) => {
	const dispatch = useDispatch();
	const departmentList = useSelector((state) => state.department.list);
	const jabatanListByDepartment = useSelector((state) => state.jabatan.listByDepartment);
	const karyawanList = useSelector((state) => state.karyawan.list);
	const formData = useSelector((state) => state.karyawan.formData);
	const [selectedDepartment, setSelectedDepartment] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(updateFormData({ name, value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (type === "create") {
			dispatch(createKaryawan(formData));
			dispatch(fetchKaryawanList());
		} else {
			dispatch(updateKaryawan(formData));
		}
		onClose();
	};

	const formatDateToYYYYMMDD = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const day = ("0" + date.getDate()).slice(-2);
		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		dispatch(fetchDepartmentList());
		if (karyawanId) {
			const karyawan = karyawanList.find((item) => item.id === karyawanId);
			if (karyawan) {
				for (const key in karyawan) {
					if (karyawan.hasOwnProperty(key)) {
						const value = key === "tanggal_lahir" ? formatDateToYYYYMMDD(karyawan[key]) : karyawan[key];
						dispatch(updateFormData({ name: key, value }));
					}
				}
				setSelectedDepartment(karyawan.jabatan.department.id);
				dispatch(updateFormData({ name: "jabatan_id", value: karyawan.jabatan.id }));
			}
		} else {
			dispatch(clearFormData());
		}
	}, [dispatch, karyawanId, karyawanList]);

	useEffect(() => {
		if (selectedDepartment) {
			dispatch(fetchJabatanByDepartment(selectedDepartment));
		}
	}, [selectedDepartment, dispatch]);

	return (
		<div className="bg-white p-6 rounded-lg">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl">{type === "create" ? "Create" : "Edit"} Karyawan</h2>
				<button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700">
					&times;
				</button>
			</div>
			<form className="grid gap-4" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
						Nama
					</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						type="text"
						id="name"
						name="name"
						placeholder="John Doe"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
							Usia
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							type="number"
							id="age"
							name="age"
							placeholder="25"
							value={formData.age}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
							Jenis Kelamin
						</label>
						<div className="flex items-center h-10">
							<input type="radio" id="genderL" name="gender" value="L" checked={formData.gender === "L"} onChange={handleChange} className="mr-2" required />
							<label htmlFor="genderL" className="mr-4 text-sm font-medium text-gray-900">
								Laki-laki
							</label>
							<input type="radio" id="genderP" name="gender" value="P" checked={formData.gender === "P"} onChange={handleChange} className="mr-2" />
							<label htmlFor="genderP" className="text-sm font-medium text-gray-900">
								Perempuan
							</label>
						</div>
					</div>
				</div>
				<div>
					<label htmlFor="tanggal_lahir" className="block mb-2 text-sm font-medium text-gray-900">
						Tanggal Lahir
					</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						type="date"
						id="tanggal_lahir"
						name="tanggal_lahir"
						value={formData.tanggal_lahir}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">
						Alamat
					</label>
					<textarea
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						row="2"
						id="alamat"
						name="alamat"
						placeholder="Jl. Alhambra"
						value={formData.alamat}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">
						Department
					</label>
					<select
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="department"
						name="department_id"
						value={selectedDepartment}
						onChange={(e) => setSelectedDepartment(e.target.value)}
						required
					>
						<option value="" disabled>
							Select Department
						</option>
						{departmentList &&
							departmentList.map((department) => (
								<option key={department.id} value={department.id}>
									{department.name}
								</option>
							))}
					</select>
				</div>
				<div>
					<label htmlFor="jabatan_id" className="block mb-2 text-sm font-medium text-gray-900">
						Jabatan
					</label>
					<select
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="jabatan_id"
						name="jabatan_id"
						value={formData.jabatan_id}
						onChange={handleChange}
						required
					>
						<option value="" disabled>
							Select Jabatan
						</option>
						{jabatanListByDepartment &&
							jabatanListByDepartment.map((jabatan) => (
								<option key={jabatan.id} value={jabatan.id}>
									{jabatan.name}
								</option>
							))}
					</select>
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
					Submit
				</button>
			</form>
		</div>
	);
};

export default KaryawanModal;
