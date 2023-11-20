import React,{useEffect} from 'react'
import Cookies from 'cookies';
import { useRouter } from 'next/router';

import Doctor from '../components/layout/Doctors/index'
import verifyToken from '@/apis/verifyToken'

const Doctors = ({sessionData}) => {
  const router = useRouter()
    useEffect(() => {
        if (!sessionData.isAuthorized) {
          router.push("/");
        } 
      }, []);
    
  return (
    <React.Fragment>
      <Doctor/>
    </React.Fragment>
  )
}

export default Doctors

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }