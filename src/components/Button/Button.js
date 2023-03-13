import React from 'react';
import { LoadMoreButton } from './Button.styled';

const Button = ({ onLoadMoreClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onLoadMoreClick}>
      Load more
    </LoadMoreButton>
  );
};

export default Button;
