import React from 'react'

function Product({
    id,
    name,
    description,

  }) {
  return (
    <div className="card">

      <div className="card-header px-4 pt-4 pb-0">
        <h4 className="mb-0">
          <Link to={`/products/${id}`} className="">
            {name}
          </Link>
        </h4>
      </div>
      <div className="card-body px-4 pt-2">
        <p className="text-truncate-3">{description}</p>
      </div>
    
    </div>
  )
}

export default Product