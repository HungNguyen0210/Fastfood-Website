import express from "express";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
} from "../controllers/account.controller.js";

const router = express.Router();

router.get("/accounts", getAllAccounts);
router.get("/accounts/:id", getAccountById);
router.post("/accounts", createAccount);
router.put("/accounts/:id", updateAccount);
router.delete("/accounts/:id", deleteAccount);

export default router;
