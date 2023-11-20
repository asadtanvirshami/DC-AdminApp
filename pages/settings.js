import React,{useEffect} from 'react'
import Cookies from 'cookies';
import { useRouter } from 'next/router';

import verifyToken from '@/apis/verifyToken'
import Setting from '@/components/layout/Settings';

const Settings = ({sessionData}) => {
  const router = useRouter()
    useEffect(() => {
        if (!sessionData.isAuthorized) {
          router.push("/");
        } 
      }, []);

  return (
    <React.Fragment>
      <Setting sessionData={sessionData}/>
    </React.Fragment>
  )
}

export default Settings

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }