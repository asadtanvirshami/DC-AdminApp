import React,{useEffect} from 'react'
import Cookies from 'cookies';
import { useRouter } from 'next/router';

import verifyToken from '@/apis/verifyToken'
import Client from '../components/layout/Clients/index'

const Clients = ({sessionData}) => {
  const router = useRouter()
    useEffect(() => {
        if (!sessionData.isAuthorized) {
          router.push("/");
        } 
      }, []);
  return (
    <React.Fragment>
      <Client/>
    </React.Fragment>
  )
}

export default Clients

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }