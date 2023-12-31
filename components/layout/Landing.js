import React, { useEffect, memo } from 'react';

import Router from "next/router";
import Loader from '../shared/Loader';

import { delay } from '@/functions/delay';

const Landing = () => {
  
    const makeRoute = async() => {
     
      await delay(3000);
      Router.push("/auth");
    }
    
    useEffect(() => {
      makeRoute();
    }, [])

  return (
    <Loader/>
  )
}

export default memo(Landing)