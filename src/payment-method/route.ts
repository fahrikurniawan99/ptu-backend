import express from "express";
import {
  CREATE_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD,
  GET_PAYMENT_METHOD_LIST,
} from "./enpoint";
import * as Controller from "./controller";

const router = express.Router();

router.get(GET_PAYMENT_METHOD_LIST, Controller.getPaymentMethodList);
router.post(CREATE_PAYMENT_METHOD, Controller.createPaymentMethod);
router.delete(DELETE_PAYMENT_METHOD, Controller.deletePaymentMethod);

export default router;
