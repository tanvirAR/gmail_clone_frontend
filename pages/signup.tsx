import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import styles from "./SignupPage.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSignupMutation } from "../features/auth/authApi";
import Error from "../Components/common/Error/Error";
import { useRouter } from "next/router";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [email, setEmail] = useState("");

  //error state
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const [signup, { isLoading, isError, error, data: response }] =
    useSignupMutation();

  // console.log(response)
  // console.log(isError);
  // console.log(error);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { firstName, lastName, password, email };
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    }
    if (password === confirmPassword) {
      // //clear all previous error before requesting
      setPasswordMatchError(false);
      setEmailError(false);
      setFirstNameError(false);
      setLastNameError(false);
      setPasswordError(false);
      signup(userData);
    }
  };

  // && !passwordError && !passwordMatchError && !emailError && !firstNameError && !lastNameError

  // error handler

  useEffect(() => {
    // console.log(error?.data.mappedErrors)
    if (isError && error) {
      Object.keys(error.data.mappedErrors).forEach((errorField) => {
        // console.log(errorField);
        const errorMessage = error?.data?.mappedErrors[errorField].msg;
        // console.log(errorMessage);
        if (errorField == "firstName") {
          setFirstNameError(errorMessage);
        } else if (errorField == "lastName") {
          setLastNameError(errorMessage);
        } else if (errorField == "email") {
          setEmailError(errorMessage);
        } else if (errorField == "password") {
          setPasswordError(errorMessage);
        }
      });
    }

    if (response) {
      router.push("/");
    }
  }, [isError, error, response, router]);

  // loading state component style
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#3f7ae6",
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Sign Up</h2>
        <br />

        <p className={styles.signUpDiv}>
          Already have an account? 
          <Link href={"/"}>
            <span> Sign In</span>
          </Link>
        </p>
        <form onSubmit={submitHandler}>
          <div className={styles.inputBox}>
            <input
              style={{
                border: firstNameError ? "1px solid red" : "1px solid #ccc",
              }}
              name="email"
              onChange={(e) => setFirstName(e.target.value)}
              required
              value={firstName}
            />
            <label style={{ color: firstNameError ? "red" : "grey" }}>
              First Name
            </label>
            {firstNameError && <Error message={firstNameError} />}
          </div>
          <div className={styles.inputBox}>
            <input
              style={{
                border: lastNameError ? "1px solid red" : "1px solid #ccc",
              }}
              name="email"
              onChange={(e) => setLastName(e.target.value)}
              required
              value={lastName}
            />
            <label style={{ color: lastNameError ? "red" : "grey" }}>
              Last Name
            </label>
            {lastNameError && <Error message={lastNameError} />}
          </div>
          <div className={styles.inputBox}>
            <input
              style={{
                border: emailError ? "1px solid red" : "1px solid #ccc",
              }}
              // type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
            <label style={{ color: emailError ? "red" : "grey" }}>Email</label>
            {emailError && <Error message={emailError} />}
          </div>
          <div className={styles.inputBox}>
            <input
              style={{
                border: passwordError ? "1px solid red" : "1px solid #ccc",
              }}
              name="email"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              value={password}
            />
            <label style={{ color: passwordError ? "red" : "grey" }}>
              Password
            </label>
            {passwordError && <Error message={passwordError} />}
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="text"
              onChange={(e) => setConfirmPassowrd(e.target.value)}
              required
              autoComplete="off"
              value={confirmPassword}
            />
            <label>Confirm Password</label>
          </div>
          {passwordMatchError && (
            <p className={styles.errorMessage}>Password do not match!</p>
          )}
          {response && <p style={{ color: "#3c73e9" }}>Signup Successfull!</p>}
          {!isLoading && (
            <input
              className={styles.submit}
              disabled={isLoading}
              type="submit"
              name="sign-in"
              value="Signup"
            />
          )}
        </form>
      </div>
    </div>
  );
}
