import React, { Suspense } from 'react'
import { httpInterceptedServices } from '@core/http-service'
import { Await, useLoaderData } from 'react-router-dom';
import ProductList from '../features/products/components/ProductList';

const Products=()=> {
  const data = useLoaderData();
  return (
    <div className="row">
    <div className="col-12">
      <div className="d-flex align-items-center justify-content-between m-5">
        <a href="" className="btn btn-primary fw-bolder mt-n1">
          افزودن محصول جدید
        </a>
      </div>
      <Suspense
        fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
      >
        <Await resolve={data.courses}>
          {(loadedCourses) => <ProductList products={loadedCourses} />}
        </Await>
      </Suspense>
    </div>
  </div>
  )
}
export  async function productsLoader(){
  const response =await httpInterceptedServices.get('/products/all/items/1/page/1')
  console.log(response)
  return response.data
}
export default Products