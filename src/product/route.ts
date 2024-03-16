import { Router } from "express";
import * as Controller from "./controller";
import {
  LIST_PRODUCT,
  CREATE_PRODUCT,
  DETAIL_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "./endpoint";

const router = Router();

router.post(CREATE_PRODUCT, Controller.createProduct);
router.get(LIST_PRODUCT, Controller.getProductList);
router.get(DETAIL_PRODUCT, Controller.getDetailProduct);
router.delete(DELETE_PRODUCT, Controller.deleteProduct);

export default router;
