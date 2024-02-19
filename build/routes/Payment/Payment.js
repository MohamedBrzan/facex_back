"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetPayments_1 = __importDefault(require("../../controllers/Payment/GetPayments"));
const GetPayment_1 = __importDefault(require("../../controllers/Payment/GetPayment"));
const UpdatePayment_1 = __importDefault(require("../../controllers/Payment/UpdatePayment"));
const DeletePayment_1 = __importDefault(require("../../controllers/Payment/DeletePayment"));
const CreatePayment_1 = __importDefault(require("../../controllers/Payment/CreatePayment"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Payments
router.get('/', GetPayments_1.default);
// Get Payment
router.get('/:id', GetPayment_1.default);
// Post Payment
router.post('/', IsAuthenticated_1.default, CreatePayment_1.default);
// Put Payment
router.put('/:id', IsAuthenticated_1.default, UpdatePayment_1.default);
// Delete Payment
router.delete('/:id', IsAuthenticated_1.default, DeletePayment_1.default);
exports.default = router;
