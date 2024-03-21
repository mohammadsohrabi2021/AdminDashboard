import React from 'react'

function ProductList({products}) {
  return (
    <>
      <div className="row">
        {products.map((product) => (
          <div className="col-12 col-md-6 col-lg-3" key={product.id}>
            <Course {...product} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductList