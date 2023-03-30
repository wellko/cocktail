import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
	createCocktails,
	deleteCocktails,
	getCocktails,
	getCocktailsByAuthor,
	publicCocktails
} from "./CocktailsPageThunks";
import {Cocktail} from "../../types";

interface Initial {
	cocktails: Cocktail[];
	loading: boolean;
	posting: boolean;
	deleting: boolean;
	alert: boolean;
}

const initialState: Initial = {
	cocktails: [],
	loading: false,
	posting: false,
	deleting: false,
	alert: false,
};

export const CocktailsPageSlice = createSlice({
	name: 'Cocktails',
	initialState,
	reducers: {
		closeAlert: state => {
			state.alert = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCocktails.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getCocktails.fulfilled, (state, action) => {
			state.cocktails = action.payload;
			state.loading = false;
		});
		builder.addCase(getCocktails.rejected, (state) => {
			state.loading = false;
		});

		builder.addCase(getCocktailsByAuthor.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getCocktailsByAuthor.fulfilled, (state, action) => {
			state.cocktails = action.payload;
			state.loading = false;
		});
		builder.addCase(getCocktailsByAuthor.rejected, (state) => {
			state.loading = false;
		});

		builder.addCase(createCocktails.pending, (state) => {
			state.posting = true;
		});
		builder.addCase(createCocktails.fulfilled, (state) => {
			state.posting = false;
			state.alert = true;
		});
		builder.addCase(createCocktails.rejected, (state) => {
			state.posting = false;
		});

		builder.addCase(publicCocktails.pending, (state) => {
			state.posting = true;
		});
		builder.addCase(publicCocktails.fulfilled, (state) => {
			state.posting = false;
		});
		builder.addCase(publicCocktails.rejected, (state) => {
			state.posting = false;
		});

		builder.addCase(deleteCocktails.pending, (state) => {
			state.deleting = true;
		});
		builder.addCase(deleteCocktails.fulfilled, (state) => {
			state.deleting = false;
		});
		builder.addCase(deleteCocktails.rejected, (state) => {
			state.deleting = false;
		});
	},
});

export const CocktailsPageReducer = CocktailsPageSlice.reducer;
export const selectStateOfCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectStatusOfCocktails = (state: RootState) => state.cocktails.loading;
export const selectStatusOfPostingCocktails = (state: RootState) => state.cocktails.posting;
export const selectStatusOfDeletingCocktails = (state: RootState) => state.cocktails.deleting;
export const selectStatusOfAlert = (state: RootState) => state.cocktails.alert;
export const {closeAlert} = CocktailsPageSlice.actions;