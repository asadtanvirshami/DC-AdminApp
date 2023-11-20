import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from "cookies";

import verifyToken from "@/apis/verifyToken";
import Clinic from '../components/layout/Clinics/index'

const Clinics = ({ sessionData }) => {
  const router = useRouter()
  useEffect(() => {
    if (!sessionData.isAuthorized) {
      router.push("/");
    }
  }, []);
  return <React.Fragment><Clinic/></React.Fragment>;
};

export default Clinics;
export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);

  return {
    props: { sessionData: sessionRequest },
  };
}
