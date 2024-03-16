import { Router } from "express";
import * as Controller from "./controller";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  DETAIL_CATEGORY,
  LIST_CATEGORY,
  UPDATE_CATEGORY,
} from "./endpoint";

const router = Router();

router.get(LIST_CATEGORY, Controller.getCategoryList);
router.post(CREATE_CATEGORY, Controller.createCategory);
router.delete(DELETE_CATEGORY, Controller.deleteCategory);
router.get(DETAIL_CATEGORY, Controller.getDetailCategory);
router.put(UPDATE_CATEGORY, Controller.updateCategory);

export default router;
