import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/Login";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/mainLayout/MainLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <UnhandlesException />,
    // children: [
    //   {
    //     element: <Courses />,
    //     index: true,
    //     loader: coursesLoader,
    //   },
    //   {
    //     path: "course-categories",
    //     element: (
    //       <CategoryProvider>
    //         <CourseCategories />
    //       </CategoryProvider>
    //     ),
    //     loader: categoriesLoader,
    //   },
    //   {
    //     path: "courses/:id",
    //     element: <CourseDetailes />,
    //     loader: courseDetailsLoader,
    //   },
    // ],
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
