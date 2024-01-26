import { Formik } from "formik";
import React from "react";
import Textfiled from "../components/formElements/Textfiled";
import Button from "../components/formElements/Button";
import * as Yup from "yup";
import { useCreateUserMutation } from "../api";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
  const navigate= useNavigate()
  const createUserMutation = useCreateUserMutation({
    onSuccessCallback: (data) => {
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          status: data.data?.status,
          token: data.data?.token,
          user: {
            name: data.data?.user?.name,
            email: data.data?.user?.email,
            _id: data.data?.user?._id,
          },
        })
      );
      navigate("/")
    },
    onErrorCallback: (data) => {
      console.log(data);
    },
  });
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email field is required"),
    name: Yup.string()
      .min(4, "Minimum length is 4")
      .required("Name is required"),
    password: Yup.string()
      .min(6, "Minimum length is 6")
      .required("Password is required"),
  });
  return (
    <div className="w-full h-[100vh] flex justify-center items-center px-2">
      <div className="border rounded-md shadow h-96 w-full sm:w-1/2 md:w-1/3 ">
        <h1 className="text-2xl text-center py-4">Sign Up</h1>
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            createUserMutation.mutate({
              name: values?.name,
              email: values?.email,
              password: values?.password,
            });
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
                  label="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  name="name"
                  error={errors.name}
                  touched={touched?.name}
                  required
                />
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
      </div>
    </div>
  );
}
