import { Formik } from "formik";
import React from "react";
import Textfiled from "../components/formElements/Textfiled";
import * as Yup from "yup";
import Button from "../components/formElements/Button";
import { useNavigate } from "react-router-dom";
export default function SignInPage() {
  const navigate= useNavigate()
  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email field is required"),
    password: Yup.string()
      .min(6, "Minimum length is 6")
      .required("Password is required"),
  });
  return (
    <div className="w-full h-[100vh] flex justify-center items-center px-2">
      <div className="border rounded-md shadow h-96 w-full sm:w-1/2 md:w-1/3 ">
        <h1 className="text-2xl text-center py-4">Sign In</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SigninSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="px-20">
                <Textfiled
                  label="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  error={errors.email}
                  touched={touched?.email}
                  required
                />

                <Textfiled
                  label="Password"
                  name="password"
                  value={values?.password}
                  error={errors?.password}
                  onBlur={handleBlur}
                  touched={touched?.password}
                  onChange={handleChange}
                  required
                  type="password"
                />
                <Button
                  type="submit"
                  className="w-full bg-black my-2 h-10 text-white"
                  label="Submit"
                />
              </div>
            </form>
          )}
        </Formik>
        <div className="px-20">
          <p>
            Don't have an account ?{" "}
            <span className="underline text-blue-500 cursor-pointer" onClick={()=>navigate("/signup")}>
              SignUp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
