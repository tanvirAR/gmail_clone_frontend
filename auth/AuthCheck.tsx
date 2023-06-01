import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCheckLoginQuery } from "../features/auth/authApi";
import { setUser } from "../features/auth/authSlice";
import { useRouter } from "next/router";
import { accountNumber } from "../constants/constants";

interface props {
  setLoading: any;
}

export default function AuthCheck(props: props) {
  const { setLoading } = props;
  const router = useRouter()
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useCheckLoginQuery();
  useEffect(() => {

    let timeOut: NodeJS.Timeout

    if (data && !isError) {
      dispatch(setUser(data.user));
      timeOut = setTimeout(() => setLoading(false), 2000);
    }

    if (isError) {
        router.push("/")
        timeOut = setTimeout(() => setLoading(false), 2000);
    }
   
    return () => clearTimeout(timeOut)

  }, [data, isError, dispatch, setLoading]);

  return null;
}
