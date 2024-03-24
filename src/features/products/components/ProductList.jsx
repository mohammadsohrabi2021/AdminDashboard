import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Product from "./Product";
import { Card, Grid } from "@mui/material";
import { httpInterceptedServices } from "@core/http-service";

function ProductList({ products, deleteProduct }) {
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchTotalContProduct = async () => {
      const response = await httpInterceptedServices.get(
        '/products/get/total_count/'
      );
      setTotalCount(response?.data?.total_count);
    };
    fetchTotalContProduct();
  }, [location]); // useEffect را با تغییر مکان فعلی فراخوانی کنید

  return (
    <Grid>
      <Grid display={"flex"} flexWrap={"wrap"} gap={2}>
        {products.map((item) => (
          <Card zIndex={-1} key={item._id}>
            <Product {...item} deleteProduct={deleteProduct} />
          </Card>
        ))}
      </Grid>
      <Grid className="card-footer" mt={2}>
        <Pagination totalRecords={totalCount} />
      </Grid>
    </Grid>
  );
}

export default ProductList;
