import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment, updateDepartment, updateFormData, clearFormData } from "../store/departmentSlice";

const DepartmentModal = ({ onClose, type, departmentId }) => {
	const dispatch = useDispatch();
	const formData = useSelector((state) => state.department.formData);
	const departmentList = useSelector((state) => state.department.list);

	useEffect(() => {
		if (departmentId) {
			const department = departmentList.find((item) => item.id === departmentId);
			dispatch(updateFormData({ name: "name", value: department.name }));
		} else {
			dispatch(clearFormData());
		}
	}, [departmentId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(updateFormData({ name, value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (type === "create") {
			dispatch(createDepartment(formData));
		} else if (type === "edit") {
			dispatch(updateDepartment({ ...formData, id: departmentId }));
		}
		onClose();
	};

	return (
		<div className="bg-white p-6 rounded-lg">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl">{type === "create" ? "Create" : "Edit"} Department</h2>
				<button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700">
					&times;
				</button>
			</div>
			<form className="grid gap-4" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
						Department Name
					</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-96 p-2.5"
						type="text"
						id="name"
						name="name"
						placeholder="Department Name"
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

export default DepartmentModal;
