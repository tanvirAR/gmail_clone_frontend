import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCheckLoginQuery } from "../features/auth/authApi";
import { setUser } from "../features/auth/authSlice";
import { useRouter } from "next/router";
import { accountNumber } from "../constants/constants";

interface props {
  setLoading: any;
}

const timeoutDuration:number = 2000;

export default function AuthCheck(props: props) {
  const { setLoading } = props;
  const router = useRouter()
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useCheckLoginQuery();
  useEffect(() => {

    let timeOut: NodeJS.Timeout

    if (data && !isError) {
      dispatch(setUser(data.user));
      if (router.asPath=="/") {
      router.push(`/mail/u/${accountNumber}/inbox`)
      }
      timeOut = setTimeout(() => setLoading(false), timeoutDuration);
    }

    if (isError) {
        router.push("/")
        timeOut = setTimeout(() => setLoading(false), timeoutDuration);
    }
   
    return () => clearTimeout(timeOut)

  }, [data, isError, dispatch, setLoading]);

  return null;
}
