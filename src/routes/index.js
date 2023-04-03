import specialtiesRouter from "./specialtiesRouter.js";
import doctorsRouter from "./doctorsRouter.js";
import { Router } from "express";

const router = Router();

router.use("/specialties", specialtiesRouter);
router.use("/doctors", doctorsRouter);

export default router;