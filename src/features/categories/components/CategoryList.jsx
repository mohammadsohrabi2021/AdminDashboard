import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import { useLocation, useNavigation } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useCategoryContext } from "./CategoryContext";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { httpInterceptedServices } from "@core/http-service";

const CategoryList = ({ categories, deleteCategory }) => {
  const navigation = useNavigation();
  const { updateCategory } = useCategoryContext();
  const location = useLocation();
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTotalContCategories = async () => {
      const response = await httpInterceptedServices.get(
        "/categories/get/total_count/"
      );
      setTotalCount(response?.data?.parents_count);
    };
    fetchTotalContCategories();
  }, [location]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">نام</TableCell>
                <TableCell align="center">تعداد محصولات</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell align="center">{category.name}</TableCell>
                  <TableCell align="center">{category.childs.length}</TableCell>
                  <TableCell align="center">
                    <a className="ms-3" onClick={() => updateCategory(category)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="feather feather-edit-2 align-middle"
                      >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </a>
                    <a onClick={() => deleteCategory(category.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="feather feather-trash align-middle"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Grid container justifyContent="center">
          <Pagination totalRecords={totalCount} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CategoryList;
