import React from 'react';
import { Cocktail} from '../../../types';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/UsersSlice';
import noImage from '../../../assets/noimage.jpg';
import {selectStatusOfDeletingCocktails, selectStatusOfPostingCocktails} from "../CocktailsPageSlice";
import {deleteCocktails, getCocktails, publicCocktails} from "../CocktailsPageThunks";

interface state {
	cocktail: Cocktail;
}

const CocktailCard: React.FC<state> = ({ cocktail }) => {
	const user = useAppSelector(selectUser);
	const loading = useAppSelector(selectStatusOfPostingCocktails);
	const deleting = useAppSelector(selectStatusOfDeletingCocktails);
	const dispatch = useAppDispatch();
	let ImgUrl;
	if (cocktail.image) {
		ImgUrl = apiUrl + cocktail.image;
	} else {
		ImgUrl = noImage;
	}
	const navigate = useNavigate();

	const onPublic = async () => {
		await dispatch(publicCocktails(cocktail._id));
		await dispatch(getCocktails());
	};

	const onDelete = async () => {
		await dispatch(deleteCocktails(cocktail._id));
		await dispatch(getCocktails());
	};

	const onClickNavigate = () => {
		navigate('/cocktails/' + cocktail._id);
	};

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia component="img" height="200" image={ImgUrl} alt="cocktail" />
			<CardContent>
				<CardActionArea onClick={onClickNavigate}>
					<Typography gutterBottom variant="h5" component="div">
						{cocktail.name}
					</Typography>
				</CardActionArea>
				{!cocktail.isPublished && (
					<Typography variant="body1" color="red">
						Unpublished
					</Typography>
				)}
				{user?.role === 'admin' && !cocktail.isPublished && (
					<Box mb={2}>
						<LoadingButton variant="contained" onClick={onPublic} loading={loading}>
							Publish toggle
						</LoadingButton>
					</Box>
				)}
				{user?.role === 'admin'?  (
					<LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
						Delete
					</LoadingButton>
				) : (
					''
				)}
			</CardContent>
		</Card>
	);
};

export default CocktailCard;