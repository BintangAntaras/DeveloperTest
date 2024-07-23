import KaryawanModal from "./KaryawanModal";
import DepartmentModal from "./DepartmentModal";
import JabatanModal from "./JabatanModal";

const MainModal = ({ isVisible, onClose, modalType, id }) => {
	if (!isVisible) {
		return null;
	}

	const renderModal = () => {
		switch (modalType) {
			case "karyawan":
				return <KaryawanModal onClose={onClose} type={id ? "edit" : "create"} karyawanId={id} />;
			case "department":
				return <DepartmentModal onClose={onClose} type={id ? "edit" : "create"} departmentId={id} />;
			case "jabatan":
				return <JabatanModal onClose={onClose} type={id ? "edit" : "create"} jabatanId={id} />;
			default:
				return null;
		}
	};

	return <div className={`fixed inset-0 ${isVisible ? "bg-gray-500 bg-opacity-75" : "hidden"} flex items-center justify-center`}>{renderModal()}</div>;
};

export default MainModal;
