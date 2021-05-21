import {Router} from "express";
import DatabaseController from "../controllers/DatabaseController";
import {wrap} from '../common/Routes';

const databaseController = new DatabaseController();

const router = Router();

// Get connection status
router.get("/", wrap(databaseController.getStatus));
router.post("/connect", wrap(databaseController.connectDatabase));
router.get("/disconnect", wrap(databaseController.disconnectDatabase));
router.get("/meta", wrap(databaseController.getMetadata));
router.get("/metaChart", wrap(databaseController.getMetaChart));

export default router;
