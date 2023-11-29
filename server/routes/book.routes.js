import express from "express";
import bookCtrl from "../controllers/book.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();
router.route("/api/books").get(bookCtrl.list).post(bookCtrl.create);
 router
   .route("/api/books/:bookId")
  //  .get(authCtrl.requireSignin, bookCtrl.read)
   .get(bookCtrl.read)
   .put(authCtrl.requireSignin, authCtrl.hasAuthorization, bookCtrl.update)
   .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, bookCtrl.remove);
router.param("bookId", bookCtrl.bookByID);
router.route("/api/books").post(bookCtrl.create);
router.route("/api/books").get(bookCtrl.list);
router.param("bookId", bookCtrl.bookByID);
router.route("/api/books/:bookId").get(bookCtrl.read);
router.route("/api/books/:bookId").put(bookCtrl.update);
router.route("/api/books/:bookId").delete(bookCtrl.remove);
router.param("bookTitle", bookCtrl.bookByTitle);
router.route("/api/booksT/:bookTitle").get(bookCtrl.bookByTitle);

export default router;
