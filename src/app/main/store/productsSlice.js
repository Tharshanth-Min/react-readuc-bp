import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = createAsyncThunk('eCommerceApp/products/getProducts', async (param, {dispatch}) => {
	try {
		const response = await axios.get(`${API_URL}/admin/product?per_page=${param.rowsPerPage}&page=${(parseInt(param.page) + 1)}`,{
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
			}
		});
		const {data, meta} = await response.data;
		const object = {
			data,
			meta
		}
		return object;

	}catch(error){

		throw error;
	}

});

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.products
);

const productsSlice = createSlice({
	name: 'eCommerceApp/products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: (state, action) => {
			const {data, meta} = action.payload;
			productsAdapter.setAll(state, data);
			state.meta = meta;

		},
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
