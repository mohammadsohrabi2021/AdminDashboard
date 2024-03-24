import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpInterceptedServices } from "@core/http-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategoryContext } from "./CategoryContext";
import { Grid } from "@mui/material";

const AddOrUpdateCategory = ({ setShowAddCategory }) => {
  const { category, updateCategory } = useCategoryContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("id", category.id);
    }
  }, [category]);

  const onClose = () => {
    setShowAddCategory(false);
    updateCategory(null);
  };
  const onSubmit = async (data) => {
    onClose()
    if (category) {
      let apiEndpoint = `/categories/edit/${category.id}`;
      const response =  httpInterceptedServices.put(apiEndpoint, {
        name: data.name,
      });
   
      toast.promise(
        response,
        {
          pending: "در حال ذخیره اطلاعات",
          success: {
            render() {
              const url = new URL(window.location.href);
              navigate(url.pathname + url.search);
              return "عملیات با موفقیت انجام شد";
            },
          },
          error: {
            render({ data }) {
              if (data.response.status === 400) {
                return t("categoryList." + data.response.data.code);
              } else {
                return "خطا: " + data.response.data.detail;
              }
            },
          },
        }
      );
    }else{
      let apiEndpoint = "/categories/create/";
      const response =  httpInterceptedServices.post(apiEndpoint, {
        category_path: data.name,
      });
      toast.promise(
        response,
        {
          pending: "در حال ذخیره اطلاعات",
          success: {
            render() {
              const url = new URL(window.location.href);
              navigate(url.pathname + url.search);
              return "عملیات با موفقیت انجام شد";
            },
          },
          error: {
            render({ data }) {
              if (data.response.status === 400) {
                return t("categoryList." + data.response.data.code);
              } else {
                return "خطا: " + data.response.data.detail;
              }
            },
          },
        }
      );
    }
  };
  
  
  return (
    <Grid className="card">
      <Grid className="card-body">
        <form action="" className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <Grid className="">
            <label htmlFor="" className="form-label">
              نام
            </label>
            <input
              type="text"
              className={`form-control form-control-lg ${
                errors.name && "is-invalid"
              }`}
              {...register("name", { required: true })}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="text-danger small fw-bolder mt-1">نام الزامی است</p>
            )}
          </Grid>
          <Grid className="text-start mt-3">
            <button
              type="button"
              className="btn btn-lg btn-secondary ms-3"
              onClick={onClose}
            >
              بستن
            </button>
            <button type="submit" className="btn btn-lg btn-primary ms-3">
              ثبت تغییرات
            </button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddOrUpdateCategory;
