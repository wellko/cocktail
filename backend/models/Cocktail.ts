import mongoose, {Types} from "mongoose";
import User from "./User";
import {CocktailData} from "../types";

const Schema = mongoose.Schema;
const CocktailSchema = new Schema<CocktailData>({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	receipt: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => User.findById(value),
			message: "User not found!",
		},
	},
	isPublished: {
		type: Boolean,
		required: true,
		default: false,
	},
	ingredients: {
		type: [],
		required: true,
	}
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);

export default Cocktail;