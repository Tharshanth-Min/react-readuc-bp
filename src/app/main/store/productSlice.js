import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import TitumUtils from '@titum/utils';
import { getProducts } from './productsSlice';

const API_URL = process.env.REACT_APP_API_URL;

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async (params, {dispatch}) => {
	try {
		const response = await axios.get(`${API_URL}/admin/product-show`, {
			params,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
			}
		});

		const data = await response.data.product;
		if(data === null) {

		}
		return data;
	}catch(error){

		throw error;
	}

});


export const saveProduct = createAsyncThunk('eCommerceApp/product/saveProduct', async (product, {dispatch}) => {
	try{

		const response = await axios.post(`${API_URL}/admin/product`,  {
			...product,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
			}
		});
		const data = await response.data;

		return data;

	}catch(error){

		const { status } = error.response.data;
		const errors = {
			status: status,
			errors: error.response.data.errors.sku ? error.response.data.errors.sku : 'Something went wrong'
		}
		return errors
	}

});

export const updateProduct = createAsyncThunk('eCommerceApp/product/updateProduct', async (product, {dispatch}) => {
	try{

		const response = await axios.put(`${API_URL}/admin/product/${product.id}`, {
			...product,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
			}
		});
		const data = await response.data;

		return data;

	}catch(error){


		const { status } = error.response.data;
		const errors = {
			status: status,
			errors: error.response.data.errors.sku ? error.response.data.errors.sku : 'Something went wrong'
		}
		return errors

	}

});

export const removeProduct = createAsyncThunk(
	'eCommerceApp/product/removeProduct',
	async (params, { dispatch, getState }) => {
		try {
			const response = await axios.delete(`${API_URL}/admin/product/${params.selectedProductsIds}`, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
				}});
			const data = await response.data;
			dispatch(getProducts({rowsPerPage : params.rowsPerPage , page : params.page}));
			return data;
		}catch(error){

			throw error;
		}
	}
);

const productSlice = createSlice({
	name: 'eCommerceApp/product',
	initialState: null,
	reducers: {
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: TitumUtils.generateGUID(),
					name: '',
					handle: '',
					short_desc: '',
				}
			})
		},
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => {
			if(action.payload.errors) {
				const {errors} = action.payload;
				state.errors = errors;
			}
		},
		[updateProduct.fulfilled]: (state, action) => {
			if(action.payload.errors) {
				const {errors} = action.payload;
				state.errors = errors;
			}
		},
		[removeProduct.fulfilled]: (state, action) => action.payload,
	}
});

export const { newProduct } = productSlice.actions;


export default productSlice.reducer;


