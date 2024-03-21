import { createBrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./features/categories/components/CategoryContext";
import Login, { loginAction } from "./features/identity/components/Login";
import ProductsDetails, { productsDetailsLoader } from "./features/products/components/ProductsDetails";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import CategoriesProduct, { categoriesLoader } from "./pages/CategoriesProduct";
import Home from "./pages/Home";
import NewCoupon from "./pages/NewCoupon";
import NewProduct from "./pages/NewProduct";
import Products, { productsLoader } from "./pages/Products";
import UnhandlesException from "./pages/UnhandlesException";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandlesException />,
    children: [
      {
        element: <Home />,
        index: true,
        // loader: homeLoader,
      },
      {
        path: "newProduct",
        element: <NewProduct />,
        // loader: categoriesLoader,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "products/:id",
        element: <ProductsDetails />,
        loader: productsDetailsLoader,
      },
      {
        path: "newCoupon",
        element: <NewCoupon />,
        // loader: categoriesLoader,
      },
      {
        path: "categories",
        element: (
          <CategoryProvider>
            <CategoriesProduct />
          </CategoryProvider>
        ),
        loader: categoriesLoader,
      },
      // {
      //   path: "courses/:id",
      //   element: <CourseDetailes />,
      //   loader: courseDetailsLoader,
      // },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
    ],
  },
]);
export default router;
