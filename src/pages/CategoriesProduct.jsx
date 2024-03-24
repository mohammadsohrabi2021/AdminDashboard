import React, { Suspense, useState } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { httpInterceptedServices } from "@core/http-service";
import CategoryList from "../features/categories/components/CategoryList";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AddOrUpdateCategory from "../features/categories/components/AddOrUpdateCategory";
import { useCategoryContext } from "../features/categories/components/CategoryContext";

function CategoriesProduct() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showAddCategory, setShowAddCategory] = useState();
  const { category } = useCategoryContext();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const deleteCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false);
    const response = httpInterceptedServices.delete(
      `/categories/delete/${selectedCategory}`
    );
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
            return t("categoryList." + data.response.data.code);
          },
        },
      }
      // { position: toast.POSITION.BOTTOM_LEFT }
    );
  };

  const data = useLoaderData();

  return (
    <>
       <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between my-5">
            <h3 className="mb-0">دسته بندی ها</h3>
            <button
              className="btn btn-primary fw-bolder mt-n1"
              onClick={() => setShowAddCategory(true)}
            >
              <i className="fas fa-plus ms-2"></i>افزودن دسته جدید
            </button>
          </div>
          {(showAddCategory || category) && (
            <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
          )}
          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
          >
            <Await resolve={data?.categories}>
              {(loadedCategories) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  categories={loadedCategories}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف دسته اطمینان دارید؟"
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
          onClick={handleDeleteCategory}
        >
          حذف
        </button>
      </Modal> 
    </>
  );
}
export async function categoriesLoader({request}) {
  return defer({
    categories: loadCategories(request),
  });
}
const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get("page") || 1;

  const pageSize = 10;
  let url = "/categories/get/all/items/";
  url += `${pageSize}/page/${page}`;
  const response = await httpInterceptedServices.get(url);
  console.log(response.data)
  return response.data;
};

export default CategoriesProduct;
