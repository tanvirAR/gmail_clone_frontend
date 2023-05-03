/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import styles from "./SignIn.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLoginMutation } from "../features/auth/authApi";
import Error from "../Components/common/Error";
import validateEmail from "../utils/emailValidator";
import { LoadingCircle } from "../Components/common/LoadingCircle";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // error state
  const [commonError, setCommonError] = useState<string | boolean>(false);
  const [emptyUsernameError, setEmptyUsernameError] = useState<string | boolean>(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState<
    string | boolean
  >(false);

  const router = useRouter();

  const [login, { isSuccess, isLoading, error, data, isError }] =
    useLoginMutation();

  const loginHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const loginData = { email: username, password };
    const isValidEmail = validateEmail(username);

    if (username == "" && password == "") {
      setEmptyUsernameError("Enter an email!");
      setEmptyPasswordError("Enter a password!");
    } else if (username == "") {
      setEmptyUsernameError("Enter an email!");
    } else if (password == "") {
      setEmptyPasswordError("Enter a password!");
    } else if (isValidEmail == null) {
      setCommonError("Enter a valid Email Address!");
    } else {
      // clear previous error
      setCommonError(false);
      setEmptyUsernameError(false);
      setEmptyPasswordError(false);

      // finally send request
      login(loginData);
    }
  };

console.log(error)
console.log(data)

  //handling response error
  useEffect(() => {
    // console.log(error)
    if (isError && error) {
      setCommonError(error?.data?.error);
    }
    if (!isError && isSuccess) {
      router.push("/mail/u/1/inbox");
    }
  }, [isError, error, data, isSuccess, router]);

  return (
    <div className={styles.box}>
      <h2 onClick={() => router.push("/mail/u/1/inbox")}>Sign in</h2>
      <br />

      <p className={styles.signUpDiv}>
        Don't have an account?
        <Link href={"/signup"}>
          {" "}
          <span> Signup</span>
        </Link>
      </p>
      <form onSubmit={loginHandler}>
        <div className={styles.inputBox}>
          <input
            name="email"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Username</label>
          {emptyUsernameError && <Error message={emptyUsernameError} />}
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            name="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
          <label>Password</label>
          {emptyPasswordError && <Error message={emptyPasswordError} />}
        </div>
        <p className={styles.errorP}>{commonError}</p>

        {!isLoading && (
          <input
            className={styles.submitButton}
            type="submit"
            name="sign-in"
            value="Sign In"
            disabled={isLoading}
          />
        )}

        { isLoading && <div className={styles.loadingDiv}>
          <LoadingCircle />
        </div>}
      </form>
    </div>
  );
}
