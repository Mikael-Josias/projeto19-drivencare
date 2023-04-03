import validateSchemasMiddleware from "../middlewares/validateSchemasMiddleware.js";
import clientsController from "../controllers/clientsController.js";
import schemas from "../schemas/index.js";
import { Router } from "express";

const router = Router();

router.post("/create", validateSchemasMiddleware(schemas.clientSignUpSchema), clientsController.create);
router.post("/signin", validateSchemasMiddleware(schemas.signInSchema), clientsController.signIn);

export default router;