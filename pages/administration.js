import React, { useEffect } from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";

import Administration from "@/components/layout/Administration";
import verifyToken from "@/apis/verifyToken";

const Admins = ({ sessionData }) => {
  const router = useRouter();
  useEffect(() => {
    if (!sessionData.isAuthorized) {
      router.push("/");
    }
  }, []);

  return (
    <React.Fragment>
      <Administration />
    </React.Fragment>
  );
};

export default Admins;

export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);

  return {
    props: { sessionData: sessionRequest },
  };
}
