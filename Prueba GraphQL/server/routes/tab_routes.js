import { Router } from "express";
import { getAllTabs } from '../../src/controllers/tab_controller';
const router = Router();

router.get('/getAllTabs', getAllTabs);

export {router};

