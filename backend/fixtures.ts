import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Cocktail from "./models/Cocktail";

const run = async () => {
	mongoose.set("strictQuery", false);
	await mongoose.connect(config.db);
	const db = mongoose.connection;
	try {
		await db.dropCollection("users");
		await db.dropCollection("cocktails");
	} catch (e) {
		console.log("Collections were not present, skipping drop...");
	}
	const [user1, user2] = await User.create(
		{
			email: "admin@gmail.com",
			password: "admin",
			displayName: "admin",
			avatar: "images/admin.png",
			role: "admin",
			token: "admin",
		},
		{
			email: "user@gmail.com",
			password: "user",
			displayName: "user",
			avatar: "images/user.jpg",
			role: "user",
			token: "user",
		}
	);

	await Cocktail.create(
		{
			name: "Margarita",
			receipt: "Fill a cocktail shaker with ice, then add the tequila, lime juice and triple sec. Shake until the outside of the shaker feels cold.",
			author: user1._id,
			isPublished: true,
			image: "images/margarita.jpg",
			ingredients: [
				{name: "tequila reposado", amount: "50ml"},
				{name: "lime juice", amount: "25ml"},
				{name: "triple sec", amount: "20ml"}
			],
		},
		{
			name: "Espresso martini",
			receipt: "Once the sugar syrup is cold, pour 1 tbsp into a cocktail shaker along with a handful of ice, the vodka, espresso and coffee liqueur. Shake until the outside of the cocktail shaker feels icy cold.",
			author: user1._id,
			isPublished: true,
			image: "images/Espresso.jpg",
			ingredients: [
				{name: "vodka", amount: "100ml"},
				{name: "espresso coffee", amount: "50ml"},
				{name: "coffee liqueur", amount: "50ml"}
			],
		},
		{
			name: "Banana daiquiri",
			receipt: "Put the rum, banana liqueur, lime juice, banana and ice in a blender suitable for crushing ice, and blitz until smooth.",
			author: user2._id,
			isPublished: true,
			image: "images/Banana-daiquiri.jpg",
			ingredients: [
				{name: "white rum", amount: "50ml"},
				{name: "lime juice", amount: "10ml"},
				{name: "banana liqueur", amount: "25ml"},
				{name: "ripe banana, peeled", amount: "1"}
			],
		},
		{
			name: "Pink negroni",
			receipt: "Combine the pink gin, vermouth and Aperol in a tumbler with a small handful of ice. Stir until the outside of the glass feels cold.",
			author: user2._id,
			image: "images/Pink-negroni.jpg",
			ingredients: [
				{name: "pink gin", amount: "35ml"},
				{name: "sweet white vermouth", amount: "25ml"},
				{name: "Aperol", amount: "15ml"}
			],
		},
);
	await db.close();
};

run().catch(console.error);