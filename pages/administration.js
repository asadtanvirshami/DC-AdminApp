import React, { useEffect } from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";
import axios from "axios";

import Administration from "@/components/layout/Administration";
import verifyToken from "@/apis/verifyToken";

const Admins = ({ sessionData, admins }) => {
  const router = useRouter();
  useEffect(() => {
    if (!sessionData.isAuthorized) {
      router.push("/");
    }
  }, []);

  return (
    <React.Fragment>
      <Administration admins={admins.result} />
    </React.Fragment>
  );
};

export default Admins;

export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);
  const admins = await axios
    .get(process.env.NEXT_PUBLIC_GET_ADMINS,{headers:{page:0,limit:5}})
    .then((r) => r.data);

  return {
    props: { sessionData: sessionRequest, admins:admins },
  };
}
