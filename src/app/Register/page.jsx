"use client";

import axios from "axios";
import { useFormik } from "formik";
import UserContext from "../context/userContext/UserContextProvider";
import * as Yup from "yup";
import { environment } from "../enivronment";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Register() {
  let { setLogin } = useContext(UserContext);
  const [apiError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  function handleRegister(formsData) {
    setLoading(true);
    axios
      .get(`${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.api_Key}`, formsData)
      .then((response) => {
        if (response.data.success == "true") {
          localStorage.setItem("userToken", response.data.request_token);
          setError(response.data.success);
          setLogin(response.data.request_token);
          setLoading(false);
          router.push("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  }



  return (
    <div
      className='min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-500 '
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div
          className='backdrop-blur-lg shadow-xl rounded-xl p-6 border transition-colors duration-500 '
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='text-center text-2xl font-bold tracking-tight mb-5'
          >
            Register Now
          </motion.h2>

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='p-2 mb-4 text-sm rounded-md border '
            >
              <span className="font-medium">{apiError}</span>
            </motion.div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="usName"
                className='block text-sm font-medium '
              >
                Username
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                id="usName"
                type="text"
                required
                className='mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500'
              />
              {formik.errors.name && formik.touched.name && (
                <div
                  className='mt-1 text-xs'
                >
                  {formik.errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="ur-email"
                className='block text-sm font-medium '
              >
                Email
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                id="ur-email"
                type="email"
                required
                className='mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500'
              />
              {formik.errors.email && formik.touched.email && (
                <div
                  className='mt-1 text-xs'
                >
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className='block text-sm font-medium '
              >
                Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                id="password"
                type="password"
                required
                className='mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 '
              />
              {formik.errors.password && formik.touched.password && (
                <div
                  className='mt-1 text-xs '
                >
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm_password"
                className='block text-sm font-medium '
              >
                Confirm Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                name="rePassword"
                id="confirm_password"
                type="password"
                required
                className='mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 '
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div
                  className='mt-1 text-xs '
                >
                  {formik.errors.rePassword}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="Phone"
                className='block text-sm font-medium '
              >
                Phone
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                name="phone"
                id="Phone"
                type="tel"
                required
                className='mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 '
              />
              {formik.errors.phone && formik.touched.phone && (
                <div
                  className='mt-1 text-xs '
                >
                  {formik.errors.phone}
                </div>
              )}
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                type="submit"
                className='w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg shadow-md transition-all duration-500 focus:outline-none focus:ring-2 text-sm '
              >
                <span>Register</span>
                {isLoading && <i className="fa fa-spinner fa-spin ml-2"></i>}
              </button>
            </motion.div>

            <p
              className='mt-3 text-xs text-center '
            >
              <Link href="/ForgetPassword" className="hover:underline">
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>

  );
}
