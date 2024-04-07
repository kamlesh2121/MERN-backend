import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController,
      deleteProductController, 
      getProductController, 
      getSingleProductController,
      productCategoryController,
      productCountController,
      productFiltersController, 
      productListController, 
      productPhotoController, 
      relatedProductController, 
      searchProductController, 
      updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router = express.Router();
// Routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
  );
  //update product
router.put('/update-product/:pid', requireSignIn,isAdmin,formidable(),updateProductController)

//get product
router.get('/get-product', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

//get product photo
router.get('/product-photo/:pid' ,productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

//Product Filter
router.post('/product-filters',productFiltersController)

//Product count
router.get('/product-count',productCountController)

//Product Per Page
router.get('/product-list/:page',productListController)

// Search
router.get("/search/:keyword", searchProductController);

//similar product
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product
router.get('/product-category/:slug', productCategoryController)

//payment route
//token
router.get('/braintree/token',braintreeTokenController);

//payment
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

export default router