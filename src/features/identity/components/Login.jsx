import {
  Link,
  redirect,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import logo from "@assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { httpService } from "@core/http-service";
import { Grid } from "@mui/material";
function Login() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();
  const onSubmit = (data) => {
    submitForm(data, { method: "post" });
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const routeErrors = useRouteError();
 
  return (
    <>
      <Grid className="text-center mt-4">
        <img
          src={logo}
          alt="logo"
          style={{ height: "80px", marginBottom: "15px" }}
        />
        <h1 className="h2">{t("login.title")}</h1>
        <p className="h4">{t("login.introMessage")}</p>
        <p className="lead">{t("login.areNotRegistered")}</p>
      </Grid>
      <Grid className="card">
        <Grid className="card-body">
          <Grid className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="mb-3">
                <label className="form-label">{t("login.email")}</label>
                <input
                  {...register("email", {
                    required:true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("login.validation.emailFormat"),
                    },
                    // required: true,
                    // minLength: 11,
                    // maxLength: 11,
                  })}
                  // {...register("mobile", {
                  //   required: true,
                  //   minLength: 11,
                  //   maxLength: 11,
                  // })}
                  className={`form-control form-control-lg ${
                    errors.email && "is-invalid"
                  }`}
                />
                {errors.email && errors.email.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("login.validation.emailRequired")}
                  </p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {/* {t(errors.email.message)} */}
                    {t("login.validation.emailFormat")}
                  </p>
                )}
                  {/* {errors.email &&
                  (errors.mobile.type === "minLength" ||
                    errors.mobile.type === "maxLength") && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("login.validation.mobileLength")}
                    </p>
                  )} */}
              </Grid>
              <Grid className="mb-3">
                <label htmlFor="" className="form-label">
                  {t("login.password")}
                </label>
                <input
                  {...register("password", { required: true })}
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("login.validation.passwordRequired")}
                  </p>
                )}
              </Grid>
              <Grid className="text-center mt-3">
                <button
                  className="btn btn-lg btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("login.signingin") : t("login.signin")}
                </button>
              </Grid>
              {routeErrors && (
                <Grid className="alert alert-danger text-danger p-2 mt-3">
                  {routeErrors.response?.data.map((error) => (
                    <p className="mb-0">
                      {t(`login.validation.${error.code}`)}
                    </p>
                  ))}
                </Grid>
              )}
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users/login", data);
  console.log(response)
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    return redirect("/");
  }
}
export default Login;
