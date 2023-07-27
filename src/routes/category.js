import express from "express";
import { getAll, get, create, updatePatch, remove } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const routerCategory = express.Router();

routerCategory.get("/", getAll); 
routerCategory.get("/:id", get); 
routerCategory.post("/",checkPermission, create); 
routerCategory.patch("/:id",checkPermission, updatePatch); 
routerCategory.delete("/:id",checkPermission, remove); 

export default routerCategory;
