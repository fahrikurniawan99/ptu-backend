import express from "express";
import * as Controller from "./controller";
import {
  CREATE_PAYMENT_METHOD_CATEGORY,
  DELETE_PAYMENT_METHOD_CATEGORY,
  GET_PAYMENT_METHOD_CATEGORY_LIST,
} from "./endpoint";

const router = express.Router();

router.get(
  GET_PAYMENT_METHOD_CATEGORY_LIST,
  Controller.getPaymentMethodCategoryList
);
router.post(
  CREATE_PAYMENT_METHOD_CATEGORY,
  Controller.createPaymentMethodCategory
);
router.delete(
  DELETE_PAYMENT_METHOD_CATEGORY,
  Controller.deletePaymentMethodCategory
);

export default router;
