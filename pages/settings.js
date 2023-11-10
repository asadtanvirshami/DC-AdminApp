import React,{useEffect} from 'react'
import Cookies from 'cookies';
import { useRouter } from 'next/router';

import verifyToken from '@/apis/verifyToken'
import Settings from '@/components/layout/Settings';

const settings = ({sessionData}) => {
  const router = useRouter()
    useEffect(() => {
        if (!sessionData.isAuthorized) {
          router.push("/");
        } 
      }, []);

  return (
    <React.Fragment>
      <Settings/>
    </React.Fragment>
  )
}

export default settings

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }