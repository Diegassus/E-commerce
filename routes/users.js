import { Router } from "express";
import {
    deleteUser,
  externProfile,
  getAllUsers,
  login,
  profile,
  profileUpdate,
  register,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/jwt.js";
import { roleValidator } from "../middlewares/role-validator.js";

const userRouter = Router();

userRouter.post("/", register);

userRouter.post("/auth", login);

userRouter.get("/profile", verifyToken, profile); // perfil propio

userRouter.get("/profile/:id", [verifyToken, roleValidator], externProfile); // admin ve perfil de x usuario

userRouter.get("/all", [verifyToken, roleValidator], getAllUsers); // listado de usuarios x query

userRouter.put('/update/:id', [verifyToken, roleValidator], updateUser); // perfil de terceros

userRouter.put('/update', [verifyToken], profileUpdate); // perfil propio

userRouter.delete('/delete/:id', [verifyToken, roleValidator], deleteUser);

export default userRouter;
