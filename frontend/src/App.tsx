import React from 'react';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/UsersSlice";
import AppToolbar from "./components/UI/AppToolBar/AppToolBar";
import {Route, Routes} from "react-router-dom";
import {Alert, Box, Collapse, CssBaseline, IconButton, Typography} from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import CocktailsPage from "./features/CocktailsPage/CocktailsPage";
import CocktailForm from "./features/CocktailsPage/components/CocktailForm";
import CocktailsPageFromUser from "./features/CocktailsPage/CocktailsPageFromUser";
import CloseIcon from "@mui/icons-material/Close";
import {closeAlert, selectStatusOfAlert} from "./features/CocktailsPage/CocktailsPageSlice";
import OneCocktailPage from "./features/CocktailsPage/OneCocktailPage";

function App() {
	const user = useAppSelector(selectUser);
	const alert = useAppSelector(selectStatusOfAlert);
	const dispatch = useAppDispatch();
	return (
		<>
			<CssBaseline/>
			<AppToolbar/>
			<Box sx={{width: '100%'}}>
				<Collapse in={alert}>
					<Alert
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									dispatch(closeAlert());
								}}
							>
								<CloseIcon fontSize="inherit"/>
							</IconButton>
						}
						sx={{mb: 2}}
					>
						Your cocktail added to wait list for Public
					</Alert>
				</Collapse>
			</Box>
			<Routes>
				<Route path="*" element={<Typography variant='h1'>Page not found!</Typography>}/>
				<Route path="/" element={<CocktailsPage/>}/>
				<Route path="/cocktails/:id" element={<OneCocktailPage/>}/>
				<Route
					path="/cocktails/new"
					element={
						<ProtectedRoute isAllowed={Boolean(user)}>
							<CocktailForm/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/cocktails/myCocktails"
					element={
						<ProtectedRoute isAllowed={Boolean(user)}>
							<CocktailsPageFromUser/>
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
			</Routes>
		</>
	);
}

export default App;
