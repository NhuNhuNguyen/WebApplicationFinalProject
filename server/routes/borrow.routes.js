import express from "express";
import borrowCtrl from "../controllers/borrow.controller.js";
//import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/borrows").get(borrowCtrl.list).post(borrowCtrl.create);
//router
//  .route("/api/borrows/:borrowId")
//  .get(authCtrl.requireSignin, borrowCtrl.read)
//  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, borrowCtrl.update)
//  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, borrowCtrl.remove);
router.param("borrowId", borrowCtrl.borrowByID);
router.route("/api/borrows").post(borrowCtrl.create);
router.route("/api/borrows").get(borrowCtrl.list);
router.param("borrowId", borrowCtrl.borrowByID);
router.route("/api/borrows/:borrowId").get(borrowCtrl.read);
router.route("/api/borrows/:borrowId").put(borrowCtrl.update);
router.route("/api/borrows/:borrowId").delete(borrowCtrl.remove);


//router.get('/api/products', productController.getAllProducts);

export default router;
