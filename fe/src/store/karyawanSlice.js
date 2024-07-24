import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/karyawan`;

export const fetchKaryawanList = createAsyncThunk("karyawan/fetchList", async () => {
	const response = await axios.get(API_URL);
	return response.data;
});

export const createKaryawan = createAsyncThunk("karyawan/create", async (newKaryawan) => {
	const response = await axios.post(API_URL, newKaryawan);
	return response.data;
});

export const updateKaryawan = createAsyncThunk("karyawan/update", async (updatedKaryawan) => {
	const response = await axios.put(`${API_URL}/${updatedKaryawan.id}`, updatedKaryawan);
	return response.data;
});

export const deleteKaryawan = createAsyncThunk("karyawan/delete", async (id) => {
	await axios.delete(`${API_URL}/${id}`);
	return id;
});

export const karyawanSlice = createSlice({
	name: "karyawan",
	initialState: {
		list: [],
		status: "idle",
		error: null,
		formData: {
			name: "",
			age: "",
			gender: "",
			tanggal_lahir: "",
			alamat: "",
			jabatan_id: "",
		},
	},
	reducers: {
		updateFormData: (state, action) => {
			const { name, value } = action.payload;
			state.formData[name] = value;
		},
		clearFormData: (state) => {
			state.formData = {
				name: "",
				age: "",
				gender: "",
				tanggal_lahir: "",
				alamat: "",
				jabatan_id: "",
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchKaryawanList.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchKaryawanList.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.list = action.payload;
			})
			.addCase(fetchKaryawanList.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to fetch karyawan list",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(createKaryawan.fulfilled, (state, action) => {
				Swal.fire({
					title: "Success",
					text: "Karyawan created successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(createKaryawan.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to create karyawan",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(updateKaryawan.fulfilled, (state, action) => {
				Swal.fire({
					title: "Success",
					text: "Karyawan updated successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(updateKaryawan.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to update karyawan",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(deleteKaryawan.fulfilled, (state, action) => {
				state.list = state.list.filter((karyawan) => karyawan.id !== action.payload);
				Swal.fire({
					title: "Success",
					text: "Karyawan deleted successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(deleteKaryawan.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to delete karyawan",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			});
	},
});

export const { updateFormData, clearFormData } = karyawanSlice.actions;

export default karyawanSlice.reducer;
