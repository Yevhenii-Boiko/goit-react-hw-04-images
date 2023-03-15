import React from 'react';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onLoadMoreClick}>
      Load more
    </LoadMoreButton>
  );
};
