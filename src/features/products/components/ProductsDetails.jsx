import React from "react";
import { httpInterceptedServices } from "@core/http-service";
import { Link, useLoaderData } from "react-router-dom";
import { Container, Typography, Grid, Paper, Card, CardMedia } from "@mui/material";

function ProductsDetails() {
  const data = useLoaderData();


  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h4" fontSize={'2.2rem'} fontWeight={'bold'} fontFamily={'sans-serif'} gutterBottom>
          جزئیات محصول
        </Typography>
        <Link  to={`/products/`}>
        <Typography
          variant="outlined"
          size="small"
          style={{ backgroundColor: '#66bb6a', color: 'white',border:'none',padding:'2px 10px',borderRadius:'5px' }}
        >
          بازگشت
        </Typography>
      </Link>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Card>
              <CardMedia
                component="img"
                height="fit-content"
                image={data.response.main_image}
                alt={data.response.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">
              <strong>نام:</strong> {data.response.name}
            </Typography>
            <Typography variant="h6">
              <strong>توضیحات:</strong> {data.response.description}
            </Typography>
            <Typography variant="h6">
              <strong>قیمت:</strong> {data.response.price} تومان
            </Typography>
            <Typography variant="h6">
              <strong>تعداد موجودی:</strong> {data.response.quantity}
            </Typography>
            <Typography variant="h6">
              <strong>دسته بندی:</strong> {data.response.category_path}
            </Typography>
            <Typography variant="h6">
              <strong>برند:</strong> {data.response.brand}
            </Typography>
            <Typography variant="h6">
              <strong>مواد:</strong> {data.response.material}
            </Typography>
            <Typography variant="h6">
              <strong>رنگ:</strong> {data.response.color.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {data.response.images && data.response.images.length > 0 && (
        <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
          <Typography variant="h5" gutterBottom>
            البوم تصاویر
          </Typography>
          <Grid container spacing={2}>
            {data.response.images.map((image, index) => (
              <Grid item key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`تصویر ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
}

export async function productsDetailsLoader({ params }) {
  const response = await httpInterceptedServices.get(
    `/products/get/${params.id}`
  );
  return response.data;
}

export default ProductsDetails;
