import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectStateOfCocktails, selectStatusOfCocktails} from "./CocktailsPageSlice";
import {getCocktailsByAuthor} from "./CocktailsPageThunks";
import CocktailCard from "./components/CocktailCard";
import {selectUser} from "../users/UsersSlice";

const CocktailsPageFromUser = () => {
	const dispatch = useAppDispatch();
	const cocktail = useAppSelector(selectStateOfCocktails);
	const loading = useAppSelector(selectStatusOfCocktails);
	const user = useAppSelector(selectUser)!;

	const callBack = useCallback(async () => {
		await dispatch(getCocktailsByAuthor(user._id));
	}, [dispatch, user._id]);


	useEffect(() => {
		callBack();
	}, [callBack]);

	return (
		<Container fixed>
			{cocktail.length ? <>
					<Typography textAlign="center" variant="h2">
						My Cocktails:
					</Typography>
					<Grid container gap={2}>
						{loading ? <CircularProgress/> : cocktail.map((el) => <CocktailCard key={Math.random()}
																							cocktail={el}/>)}
					</Grid>
				</> :
				<Typography textAlign="center" variant="h2">There is no cocktails yet</Typography>
			}
		</Container>
	);
};

export default CocktailsPageFromUser;