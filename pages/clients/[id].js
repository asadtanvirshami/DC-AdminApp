// pages/doctor/[id].js
import React from "react";

import Profile from "@/components/layout/Doctors/Profile";

const clientDetails = ({ data }) => {
    console.log(data)
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <Profile data={data.result}/>
    </React.Fragment>
  );
};

export default clientDetails;

export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GET_CLIENT_BY_ID}${params.id}`
    );
    const data = await response.json();
        console.log(data)
    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { data: null },
    };
  }
}
