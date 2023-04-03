import validateSchemasMiddleware from "../middlewares/validateSchemasMiddleware.js";
import doctorsController from "../controllers/doctorsController.js";
import schemas from "../schemas/index.js";
import { Router } from "express";

const router = Router();

router.post("/create", validateSchemasMiddleware(schemas.doctorsSignUpSchema), doctorsController.create);
router.post("/signin", validateSchemasMiddleware(schemas.signInSchema), doctorsController.signIn);
router.get("/search/", doctorsController.searchDoctor);

export default router;