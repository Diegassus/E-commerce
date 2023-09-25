import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.js";
import { verifyToken } from "../middlewares/jwt.js";
import { roleValidator } from "../middlewares/role-validator.js";

const productsRouter = Router();

productsRouter.post("/",[verifyToken,roleValidator], createProduct);

productsRouter.get("/",verifyToken, getAllProducts);

productsRouter.get("/:id",verifyToken, getProduct);

productsRouter.put("/:id", [verifyToken,roleValidator], updateProduct);

productsRouter.delete("/:id", [verifyToken,roleValidator], deleteProduct);

export default productsRouter;