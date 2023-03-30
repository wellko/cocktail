import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStateOfCocktails, selectStatusOfCocktails} from "./CocktailsPageSlice";
import { getOneCocktail} from "./CocktailsPageThunks";
import {useParams} from "react-router-dom";
import {Box, CircularProgress, Container, Grid, List, ListItem, Typography} from "@mui/material";
import {apiUrl} from "../../constants";
import noImage from "../../assets/noimage.jpg";
import {Ingredient} from "../../types";

const OneCocktailPage = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const cocktail = useAppSelector(selectStateOfCocktails)[0];
	const loading = useAppSelector(selectStatusOfCocktails);
	let ImgUrl;
	let cocktailIngr:Ingredient[] = [];
	if (cocktail){
		cocktailIngr = JSON.parse(cocktail.ingredients) as Ingredient[];
		if (cocktail.image) {
			ImgUrl = apiUrl + cocktail.image;
		} else {
			ImgUrl = noImage;
		}
	}

	const callBack = useCallback(async () => {
		await dispatch(getOneCocktail(id!));
	}, [dispatch, id]);

	useEffect(() => {
		callBack();
	}, [callBack]);
	return (
		<Container fixed>
			{loading ? <CircularProgress /> : cocktail &&
			<Grid container>
				<Grid item xs={4}>
					<Box component='img' src={ImgUrl} alt='cocktail'/>
				</Grid>
				<Grid item xs={8}>
					<Typography variant='h3'>{cocktail.name}</Typography>
					<Typography variant='h4'>Ingredients:</Typography>
					<List>
						{cocktailIngr.map(el => <ListItem key={Math.random()}>
							<Typography>{el.name} ... {el.amount}</Typography>
						</ListItem>)}
					</List>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h4'>Receipt</Typography>
					<Typography>{cocktail.receipt}</Typography>
				</Grid>
			</Grid>}
		</Container>
	);
};

export default OneCocktailPage;