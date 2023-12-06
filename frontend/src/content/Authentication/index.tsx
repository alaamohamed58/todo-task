import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Login from './Login';
import SignupFrom from './Signup';

interface AuthenticationProps {}

const Authentication: FC<AuthenticationProps> = () => {
  const [isLoggin, setIsLoggin] = useState<boolean>(true);
  const [isVerification, setIsVerification] = useState<boolean>(false);
  return (
    <>
      <Helmet>
        <title>{isLoggin ? 'Sign in' : 'Sign up'}</title>
      </Helmet>
      <Container maxWidth="lg">
        {isLoggin && !isVerification && (
          <Login
            setIsLoggin={setIsLoggin}
            setIsVerification={setIsVerification}
          />
        )}
        {!isLoggin && !isVerification && (
          <SignupFrom setIsLoggin={setIsLoggin} />
        )}
      </Container>
    </>
  );
};

export default Authentication;
