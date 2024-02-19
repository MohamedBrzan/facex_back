"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "pending";
    PaymentStatus["Processing"] = "processing";
    PaymentStatus["Accepted"] = "accepted";
    PaymentStatus["Denied"] = "denied";
    PaymentStatus["Active"] = "active";
    PaymentStatus["Offline"] = "offline";
})(PaymentStatus || (PaymentStatus = {}));
exports.default = PaymentStatus;
