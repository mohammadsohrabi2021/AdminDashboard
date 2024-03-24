import React, { Suspense, useState } from "react";
import {
  Await,
  defer,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { httpInterceptedServices } from "@core/http-service";
import ProductList from "../features/products/components/ProductList";
import { Grid } from "@mui/material";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const Products = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [selectedProduct, setSelectedProduct] = useState();
  const data = useLoaderData();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const deleteProduct = (productId) => {
    setSelectedProduct(productId);
    setShowDeleteModal(true);
  };
  const handleDeleteProduct = async () => {
    setShowDeleteModal(false);
    const response = httpInterceptedServices.delete(
      `/products/get/${selectedProduct}`
    );
    console.log(response)
    toast.promise(
      response,
      {
        pending: "در حال حذف",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return "عملیات حذف با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }) {
            return t("productList." + data.response.data.code);
          },
        },
      }
      // { position: toast.POSITION.BOTTOM_LEFT }
    );
  };
  return (
    <>
      <Grid className="row">
        <Grid className="col-12">
          <Grid className="d-flex align-items-center justify-content-between m-5">
            <h3 className="mb-0">محصولات</h3>
            <Link
              to={"/newProduct"}
              className="btn btn-primary fw-bolder mt-n1"
            >
              افزودن محصول جدید
            </Link>
          </Grid>
          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
          >
            <Await resolve={data.products}>
              {(loadedProducts) => <ProductList deleteProduct={deleteProduct} products={loadedProducts} />}
            </Await>
          </Suspense>
        </Grid>
      </Grid>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف محصول اطمینان دارید؟"
      >
        <button
          type="button"
          className="btn btn-secondary fw-bolder"
          onClick={() => setShowDeleteModal(false)}
        >
          انصراف
        </button>
        <button
          type="button"
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteProduct}
        >
          حذف
        </button>
      </Modal>
    </>
  );
};
export async function productsLoader({ request }) {
  return defer({
    products: loadProducts(request),
  });
}
const loadProducts = async (request) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  console.log(page,'pageProduct')
  const pageSize = 10;
  let url = "/products/all/items/";
  url += `${pageSize}/page/${page}`;
  const response = await httpInterceptedServices.get(url);

  return response.data;
};

export default Products;
