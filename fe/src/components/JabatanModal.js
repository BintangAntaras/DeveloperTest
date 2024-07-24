import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJabatan, fetchJabatanList, updateJabatan, clearFormData, updateFormData } from "../store/jabatanSlice";
import { fetchDepartmentList } from "../store/departmentSlice";

const JabatanModal = ({ onClose, type, jabatanId }) => {
	const dispatch = useDispatch();
	const departmentList = useSelector((state) => state.department.list);
	const jabatanList = useSelector((state) => state.jabatan.list);
	const jabatan = jabatanList.find((jabatan) => jabatan.id === jabatanId);
	const formData = useSelector((state) => state.jabatan.formData);

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(updateFormData({ name, value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (type === "create") {
			dispatch(createJabatan(formData));
			dispatch(fetchJabatanList());
		} else {
			dispatch(updateJabatan({ ...formData, jabatanId }));
		}
		dispatch(clearFormData());
		onClose();
	};

    useEffect(() => {
        dispatch(fetchJabatanList());
    }, [dispatch]);

    useEffect(() => {
		dispatch(fetchDepartmentList());
		if (jabatanId) {
			const jabatan = jabatanList.find((item) => item.id === jabatanId);
			if (jabatan) {
				for (const key in jabatan) {
					if (jabatan.hasOwnProperty(key)) {
						const value = jabatan[key];
						dispatch(updateFormData({ name: key, value }));
					}
				}
			}
		} else {
			dispatch(clearFormData());
		}
	}, [dispatch, jabatanId, jabatanList]);

	return (
		<div className="bg-white p-6 rounded-lg">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl">{type === "create" ? "Create" : "Edit"} Jabatan</h2>
				<button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700">
					&times;
				</button>
			</div>
			<form className="grid gap-4" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="department_id" className="block mb-2 text-sm font-medium text-gray-900">
						Department
					</label>
					<select
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-96 p-2.5"
						id="department_id"
						name="department_id"
						value={formData.department_id}
						onChange={handleChange}
						required
					>
						<option value="" disabled>
							Select department
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
					<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
						Nama Jabatan
					</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-96  p-2.5"
						type="text"
						id="name"
						name="name"
						placeholder="Manager"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
					Submit
				</button>
			</form>
		</div>
	);
};

export default JabatanModal;
