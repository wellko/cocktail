import React, {useState} from 'react';
import {User} from '../../../types';
import {Avatar, Button, Grid, Menu, MenuItem} from '@mui/material';
import {useAppDispatch} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {logoutAction} from '../../../features/users/UsersThunks';
import {apiUrl} from '../../../constants';
import noImage from '../../../assets/noimage.jpg';
import {getCocktails} from "../../../features/CocktailsPage/CocktailsPageThunks";

interface Props {
	user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	let imageUrl = '';
	if (user.avatar) {
		imageUrl = user.avatar;
	}

	if (user.avatar?.indexOf('images') !== -1) {
		imageUrl = apiUrl + user.avatar;
	}
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Grid item xs={2}>
				<Avatar alt="avatar" src={user.avatar ? imageUrl : noImage}
						sx={{width: 50, height: 50, display: 'inline-block'}}/>
			</Grid>
			<Grid item container xs={10}>
				<Button sx={{paddingBottom: '10px', marginY: "auto"}} onClick={handleClick} color="inherit">
					Hello, {user.displayName}
				</Button>
			</Grid>

			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem
					onClick={() => {
						navigate('/cocktails/myCocktails');
					}}
				>
					My cocktails
				</MenuItem>
				<MenuItem
					onClick={() => {
						navigate('/cocktails/new');
					}}
				>
					Add cocktail
				</MenuItem>
				<MenuItem
					onClick={async () => {
						await dispatch(logoutAction());
						await dispatch(getCocktails());
						navigate('/');
					}}
				>
					Log Out
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;