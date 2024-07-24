import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/department`;

export const fetchDepartmentList = createAsyncThunk("department/fetchDepartmentList", async () => {
	const response = await axios.get(`${API_URL}`);
	return response.data;
});

export const createDepartment = createAsyncThunk("department/createDepartment", async (newDepartment) => {
	const response = await axios.post(`${API_URL}`, newDepartment);
	return response.data;
});

export const updateDepartment = createAsyncThunk("department/updateDepartment", async (updatedDepartment) => {
	const response = await axios.put(`${API_URL}/${updatedDepartment.id}`, updatedDepartment);
	return response.data;
});

export const deleteDepartment = createAsyncThunk("department/deleteDepartment", async (id) => {
	await axios.delete(`${API_URL}/${id}`);
	return id;
});

const departmentSlice = createSlice({
	name: "department",
	initialState: {
		list: [],
		status: "idle",
		error: null,
		formData: {
			name: "",
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
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDepartmentList.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDepartmentList.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.list = action.payload;
			})
			.addCase(fetchDepartmentList.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to fetch departments",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(createDepartment.fulfilled, (state, action) => {
				state.list.push(action.payload);
				Swal.fire({
					title: "Success",
					text: "Department created successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(createDepartment.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to create department",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(updateDepartment.fulfilled, (state, action) => {
				const index = state.list.findIndex((department) => department.id === action.payload.id);
				if (index !== -1) {
					state.list[index] = action.payload;
				}
				Swal.fire({
					title: "Success",
					text: "Department updated successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(updateDepartment.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to update department",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(deleteDepartment.fulfilled, (state, action) => {
				state.list = state.list.filter((department) => department.id !== action.payload);
				Swal.fire({
					title: "Success",
					text: "Department deleted successfully",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			})
			.addCase(deleteDepartment.rejected, (state, action) => {
				state.error = action.error.message;
				Swal.fire({
					title: "Error",
					text: "Failed to delete department",
					icon: "error",
					confirmButtonColor: "#3085d6",
				});
			});
	},
});

export const { updateFormData, clearFormData } = departmentSlice.actions;

export default departmentSlice.reducer;
