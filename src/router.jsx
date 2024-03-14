import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/Login";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Home from "./pages/Home";
import NewCoupon from "./pages/NewCoupon";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <UnhandlesException />,
    children: [
      {
        element: <Home />,
        index: true,
        // loader: coursesLoader,
      },
      {
        path: "newProduct",
        element: <NewProduct />,
        // loader: categoriesLoader,
      },
      {
        path: "products",
        element: <Products />,
        // loader: categoriesLoader,
      },
      {
        path: "newCoupon",
        element: <NewCoupon />,
        // loader: categoriesLoader,
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
