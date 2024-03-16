import { Router } from "express";
import * as Controller from "./controller";
import {
  LIST_OPERATOR,
  CREATE_OPERATOR,
  DETAIL_OPERATOR,
  DELETE_OPERATOR,
  UPDATE_OPERATOR,
} from "./endpoint";

const router = Router();

router.get(LIST_OPERATOR, Controller.getOperatorList);
router.post(CREATE_OPERATOR, Controller.createOperator);
router.get(DETAIL_OPERATOR, Controller.getDetailOperator);
router.delete(DELETE_OPERATOR, Controller.deleteOperator);
router.put(UPDATE_OPERATOR, Controller.updateOperator);

export default router;
