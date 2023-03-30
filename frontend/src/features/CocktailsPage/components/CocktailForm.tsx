import React, { useState } from 'react';
import { Box, Button , Grid, TextField} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import {selectStatusOfPostingCocktails} from "../CocktailsPageSlice";
import {CocktailMutation} from "../../../types";
import {createCocktails} from "../CocktailsPageThunks";

const CocktailForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const loading = useAppSelector(selectStatusOfPostingCocktails);
	const onSubmit = async (CocktailMutation: CocktailMutation) => {
		try {
			await dispatch(createCocktails(CocktailMutation)).unwrap();
			navigate('/');
		} catch (e) {
			// error
		}
	};

	const [state, setState] = useState<CocktailMutation>({
		name: '',
		receipt: '',
		image: null,
		ingredients: [
			{
				name: '',
				amount: ''
			}
		]
	});

	const submitFormHandler = (e: React.FormEvent) => {
		e.preventDefault();
		void onSubmit(state);
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const inputIngredientChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		const { name, value } = e.target;
		setState((prevState) => {
			const updated = [...prevState.ingredients];
			updated[index] = { ...updated[index], [name]: value };
			return { ...prevState, ingredients: updated };
		});
	};

	const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: files && files[0] ? files[0] : null,
		}));
	};

	const addNewField = () => {
		setState((prevState) => {
			const updated = [...prevState.ingredients];
			updated.push({ name: '', amount: '' });
			return { ...prevState, ingredients: updated };
		})
	}

	return (
		<form autoComplete="off" onSubmit={submitFormHandler}>
			<Grid container direction="row" spacing={2}>
				<Grid container item xs={12}>
					<TextField
						sx={{ margin: 'auto', width: '60%' }}
						label="Cocktail"
						name="name"
						value={state.name}
						onChange={inputChangeHandler}
						required
					/>
				</Grid>

				<Grid container item xs={12}>
					{state.ingredients.map((el, index) =><Box width='60%' marginX='auto' marginBottom={2}>
						<TextField
							sx={{ width: '80%' }}
							label="ingredient"
							name="name"
							value={state.ingredients[index].name}
							onChange={(e) => inputIngredientChangeHandler(e, index)}
							required
						/>
						<TextField
							sx={{ width: '15%', marginLeft: '5%'}}
							label="amount"
							name="amount"
							value={state.ingredients[index].amount}
							onChange={(e) => inputIngredientChangeHandler(e, index)}
							required
						/>
					</Box>
					)}
				</Grid>
				<Button variant='outlined' sx={{margin: 'auto'}} type='button' onClick={addNewField}> add new ingredient</Button>
				<Grid container item xs={12}>
					<TextField
						sx={{ margin: 'auto', width: '60%' }}
						multiline
						rows={3}
						id="info"
						label="Information about cocktail"
						value={state.receipt}
						onChange={inputChangeHandler}
						name="receipt"
					/>
				</Grid>

				<Grid container item xs={12} justifyContent="center">
					<Grid item xs={6}>
						<FileInput label="Image" onChange={fileInputChangeHandler} name="image" type="image/*" />
					</Grid>
				</Grid>

				<Grid container item xs={12}>
					<LoadingButton sx={{ margin: 'auto' }} loading={loading} type="submit" color="primary" variant="contained">
						Create
					</LoadingButton>
				</Grid>
			</Grid>
		</form>
	);
};

export default CocktailForm;