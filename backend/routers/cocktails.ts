import express from "express";
import role, {RequestWithUser} from "../middleware/role";
import Cocktail from "../models/Cocktail";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";
import * as fs from "fs";
import {HydratedDocument} from "mongoose";
import permit from "../middleware/permit";
import {CocktailData} from "../types";

const cocktailRouter = express.Router();

cocktailRouter.get("/", role, async (req, res) => {
	try {
		const user = (req as RequestWithUser).user;
		const queryUser = req.query.user as string;
		if (user && user.role === "admin") {
			const cocktails = await Cocktail.find();
			return res.send(cocktails);
		}
		if (queryUser){
			const cocktails = await Cocktail.find({author: queryUser});
			return res.send(cocktails);
		}
		const cocktails = await Cocktail.find({
		isPublished: true
		});
		return res.send(cocktails);
	} catch {
		return res.sendStatus(500);
	}
});

cocktailRouter.get("/:id", role, async (req, res) => {
try {
	const response = await Cocktail.find({_id: req.params.id});
	return res.send(response);
}	catch {
	return res.sendStatus(500);
}
});

cocktailRouter.post("/",
	auth,
	imagesUpload.single("image"),
	async (req, res) => {
		const user = (req as RequestWithUser).user;
		try {
			const cocktail = await Cocktail.create({
				name: req.body.name,
				receipt: req.body.receipt,
				image: req.file? req.file.filename : null,
				author: user._id,
				ingredients: req.body.ingredients,
			});
			return res.send(cocktail);
		} catch (error) {
			if (req.file) {
				await fs.unlink(req.file.path, err => {
					console.log(err);
				})
			}
			return res.status(400).send(error);
		}
	});

cocktailRouter.patch(
	"/:id/togglePublished",
	auth,
	permit("admin"),
	async (req, res) => {
		const cocktail: HydratedDocument<CocktailData> | null = await Cocktail.findById(
			req.params.id
		);
		if (!cocktail) {
			return res.sendStatus(404);
		}
		cocktail.isPublished = !cocktail.isPublished;
		try {
			await cocktail.save();
			return res.send(cocktail);
		} catch {
			return res.sendStatus(500);
		}
	}
);

cocktailRouter.delete("/:id", auth, async (req, res) => {
	const user = (req as RequestWithUser).user;
	try {
		let deleted;
		if (user.role === "admin") {
			deleted = await Cocktail.deleteOne({_id: req.params.id});
		} else {
			deleted = await Cocktail.deleteOne({
				_id: req.params.id,
				author: user._id,
				isPublished: false,
			});
		}
		if (deleted.deletedCount === 1) {
			return res.send({message: "deleted"});
		} else {
			res.status(404).send({message: "cant delete"});
		}
	} catch {
		return res.sendStatus(500);
	}
});

export default cocktailRouter;