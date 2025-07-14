import express from "express";
import homeController from "../controllers/homeController";
import bookController from "../controllers/bookController";
import userController from "../controllers/userController";
import blogController from "../controllers/blogController";
import contactController from "../controllers/contactController";
import authController from "../controllers/authController";
import upload from "../middleware/uploadMiddleware";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/api/books", bookController.getAllBooks);
  router.get("/api/book/:id", bookController.getBookById);
  router.post("/api/book", bookController.createBook);
  router.put("/api/book/:id", bookController.updateBook);
  router.delete("/api/book/:id", bookController.deleteBook);

  router.get("/api/users", userController.getAllUsers);
  router.get("/api/user/profile", authMiddleware, userController.getProfile);
  router.get("/api/user/:id", userController.getUserById);
  router.post("/api/user", upload.single("avatar"), userController.createUser);
  router.put("/api/user/:id", userController.updateUser);
  router.delete("/api/user/:id", userController.deleteUser);
  router.post("/api/user/loginuser", userController.loginUser);
  router.post("/api/user/loginadmin", userController.loginAdmin);

  router.get("/api/blogs", blogController.getAllBlogsPage);
  router.get("/api/blog/:id", blogController.getBlogById);
  router.post("/api/blog", upload.single("image"), blogController.createBlog);
  router.get("/api/blogs/featured", blogController.getFeaturedBlogs);
  router.put(
    "/api/blog/:id",
    upload.single("image"),
    blogController.updateBlog
  );
  router.delete("/api/blog/:id", blogController.deleteBlog);

  router.post("/api/contact", contactController.createContact);
  router.get("/api/contacts", contactController.getAllContacts);

  router.post("/forgot-password", authController.sendResetOTP);
  router.post("/verify-otp", authController.verifyOTP);
  router.post("/reset-password", authController.resetPassword);

  app.use("/", router);
};

export default initWebRoutes;
