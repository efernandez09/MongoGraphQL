import express from "express";
import {ADD_TAB} from '../../src/controllers/tab_controller';
const router = express.Router();

router.post('/addTab', ADD_TAB);
