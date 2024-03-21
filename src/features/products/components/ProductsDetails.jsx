import React from 'react'
import { httpInterceptedServices } from '@core/http-service'

function ProductsDetails() {
  return (
    <div>ProductsDetails</div>
  )
}
export async function productsDetailsLoader({params}){
    const response =await httpInterceptedServices.get(`/products/get/${params.id}`)
    return response.data
}

export default ProductsDetails