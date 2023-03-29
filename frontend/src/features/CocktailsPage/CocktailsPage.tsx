import React, { useCallback, useEffect } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {selectStateOfCocktails, selectStatusOfCocktails} from "./CocktailsPageSlice";
import {getCocktails} from "./CocktailsPageThunks";
import CocktailCard from "./components/CocktailCard";

const CocktailsPage = () => {
	const dispatch = useAppDispatch();
	const cocktail = useAppSelector(selectStateOfCocktails);
	const loading = useAppSelector(selectStatusOfCocktails);

	const callBack = useCallback(async () => {
		await dispatch(getCocktails());
	}, [dispatch]);

	useEffect(() => {
		callBack();
	}, [callBack]);

	return (
		<Container fixed>
			{cocktail.length? <>
				<Typography textAlign="center" variant="h2">
					Cocktails:
				</Typography>
				<Grid container gap={2}>
			{loading ? <CircularProgress /> : cocktail.map((el) => <CocktailCard key={Math.random()} cocktail={el} />)}
				</Grid>
				</>:
				<Typography textAlign="center" variant="h2">There is no cocktails yet</Typography>
			}
		</Container>
	);
};

export default CocktailsPage;