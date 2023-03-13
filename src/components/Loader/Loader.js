import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Container } from './Loader.styled';

const Spiner = () => {
  return (
    <Container>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Container>
  );
};

export default Spiner;
