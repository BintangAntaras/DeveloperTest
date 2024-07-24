import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchKaryawanList, deleteKaryawan, clearFormData as clearKaryawanForm } from "../store/karyawanSlice";
import { clearFormData as clearJabatanForm } from "../store/jabatanSlice";
import { clearFormData as clearDepartmentForm } from "../store/departmentSlice";
import MainModal from "../components/MainModal";

export default function Home() {
	const dispatch = useDispatch();
	const karyawanList = useSelector((state) => state.karyawan.list);

	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState("");
	const [currentId, setCurrentId] = useState(null);

	const openModal = (type, id = null) => {
		setModalType(type);
		setCurrentId(id);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalType("");
		setCurrentId(null);
		setModalVisible(false);
	};

	const handleDelete = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(deleteKaryawan(id));
				Swal.fire("Deleted!", "Karyawan data has been deleted.", "success");
				dispatch(fetchKaryawanList());
			}
		});
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("-");
	};

	useEffect(() => {
		dispatch(fetchKaryawanList());
	}, [dispatch]);

	return (
		<main className="flex flex-col items-center justify-between p-4 sm:p-6 lg:p-24">
            <h1 className="text-2xl sm:text-4xl mb-6 sm:mb-12 uppercase">Data Karyawan</h1>
            <div className="flex gap-4 sm:gap-6 self-start mb-6">
                <button className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg bg-blue-600 text-blue-100" onClick={() => openModal("karyawan")}>
                    + Add New Karyawan
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg bg-sky-600 text-blue-100" onClick={() => openModal("jabatan")}>
                    + Add New Jabatan
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg bg-sky-600 text-blue-100" onClick={() => openModal("department")}>
                    + Add New Department
                </button>
            </div>
            <div className="w-full">
                <table className="min-w-full divide-y rounded border divide-gray-200">
                    <thead className="bg-blue-600 hidden sm:table-header-group">
                        <tr>
                            <th className="px-2 sm:px-6 py-3 text-center text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">NO</th>
                            <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Name</th>
                            <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Jabatan</th>
                            <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Department</th>
                            <th className="px-2 sm:px-6 py-3 text-center text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Age</th>
                            <th className="px-2 sm:px-6 py-3 text-center text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Gender</th>
                            <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Tanggal Lahir</th>
                            <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Alamat</th>
                            <th className="px-2 sm:px-6 py-3 text-center text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {karyawanList.length > 0 ? (
                            karyawanList.map((item, index) => (
                                <tr key={item.id} className="flex flex-col sm:table-row">
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">NO:</span>
                                        {index + 1}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Name:</span>
                                        {item.name}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Jabatan:</span>
                                        {item.jabatan?.name}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Department:</span>
                                        {item.jabatan?.department?.name}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Age:</span>
                                        {item.age}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Gender:</span>
                                        {item.gender}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Tanggal Lahir:</span>
                                        {formatDate(item.tanggal_lahir)}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Alamat:</span>
                                        {item.alamat}
                                    </td>
                                    <td className="flex items-center justify-between sm:table-cell px-2 sm:px-6 py-4 text-xs sm:text-base text-gray-500">
                                        <span className="sm:hidden font-semibold">Action:</span>
                                        <div className="flex gap-2 justify-center">
                                            <button className="text-blue-600 hover:text-blue-900" onClick={() => openModal("karyawan", item.id)}>
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 ml-4" onClick={() => handleDelete(item.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="9" className="text-center text-xs sm:text-base text-gray-500">No Data Found!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <MainModal isVisible={modalVisible} onClose={closeModal} modalType={modalType} id={currentId} />
        </main>
	);
}
