import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/jabatan`;

export const fetchJabatanList = createAsyncThunk("jabatan/fetchJabatanList", async (departmentId) => {
	const response = await axios.get(`${API_URL}`);
	return response.data;
});
export const fetchJabatanByDepartment = createAsyncThunk("jabatan/fetchJabatanByDepartment", async (departmentId) => {
	const response = await axios.get(`${API_URL}/department/${departmentId}`);
	return response.data;
});

export const createJabatan = createAsyncThunk("jabatan/createJabatan", async (newJabatan) => {
	const response = await axios.post(`${API_URL}`, newJabatan);
	return response.data;
});

export const updateJabatan = createAsyncThunk("jabatan/updateJabatan", async (updatedJabatan) => {
	const response = await axios.put(`${API_URL}/${updatedJabatan.id}`, updatedJabatan);
	return response.data;
});

export const deleteJabatan = createAsyncThunk("jabatan/deleteJabatan", async (id) => {
	await axios.delete(`${API_URL}/${id}`);
	return id;
});

const jabatanSlice = createSlice({
	name: "jabatan",
	initialState: {
		list: [],
		listByDepartment: [],
		status: "idle",
		error: null,
		formData: {
			name: "",
			department_id: "",
		},
	},
	reducers: {
		updateFormData: (state, action) => {
			const { name, value } = action.payload;
			state.formData[name] = value;
		},
		clearFormData: (state) => {
			state.formData = {
                id: "",
				name: "",
				department_id: "",
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchJabatanList.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchJabatanList.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.list = action.payload;
			})
			.addCase(fetchJabatanList.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to fetch jabatans",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(fetchJabatanByDepartment.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchJabatanByDepartment.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.listByDepartment = action.payload;
			})
			.addCase(fetchJabatanByDepartment.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to fetch jabatans",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(createJabatan.fulfilled, (state, action) => {
				state.list.push(action.payload);
				Swal.fire({
					title: "Success",
					text: "Jabatan created successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(createJabatan.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to create jabatan",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(updateJabatan.fulfilled, (state, action) => {
				const index = state.list.findIndex((jabatan) => jabatan.id === action.payload.id);
				if (index !== -1) {
					state.list[index] = action.payload;
				}
				Swal.fire({
					title: "Success",
					text: "Jabatan updated successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(updateJabatan.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to update jabatan",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(deleteJabatan.fulfilled, (state, action) => {
				state.list = state.list.filter((jabatan) => jabatan.id !== action.payload);
				Swal.fire({
					title: "Success",
					text: "Jabatan deleted successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(deleteJabatan.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to delete jabatan",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			});
	},
});

export const { updateFormData, clearFormData } = jabatanSlice.actions;

export default jabatanSlice.reducer;
