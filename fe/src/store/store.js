import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./departmentSlice";
import jabatanReducer from "./jabatanSlice";
import karyawanReducer from "./karyawanSlice";

const store = configureStore({
	reducer: {
		department: departmentReducer,
		jabatan: jabatanReducer,
		karyawan: karyawanReducer,
	},
});

export default store;
