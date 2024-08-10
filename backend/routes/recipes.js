import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import { getDocs, collection } from "@firebase/firestore";
import { db } from "../app.js"
const router = express.Router();
import admin from "firebase-admin"

dotenv.config(); // load .env file

const app_id = process.env["EDAMAM_APP_ID"];
const app_key = process.env["EDAMAM_APP_KEY"];


router.get("/lunch", async (req, res) => {
   const mealType = "Lunch";
    try {
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&random=true&mealType=${mealType}&app_id=${app_id}&app_key=${app_key}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error calling Edamam on backend:", error);
        res.status(500).json({message: "Problem on backend"})
    }
});

router.get("/user-submitted", async (req, res) => {
    try {
        const response = await db.collection('all-recipes').get();
        let recipesArray = [];
        response.forEach((doc) => recipesArray.push({ ...doc.data(), isEdamam: false, id: doc.id }));
        console.log(recipesArray)
        res.status(200).json(recipesArray);
    } catch (e) {
        console.error("Error fetching all recipes from firestore database: ", e);
    }
})

export default router;