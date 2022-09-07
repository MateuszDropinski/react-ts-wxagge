import * as React from 'react';
import styled from 'styled-components';
import { ListElementType } from '../data';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  background-color: #b0dfe5;
  overflow: hidden;
  border-radius: 5px;
`;

const StyledTitle = styled.h3`
  background-color: #7ef9ff;
  margin: 0;
  padding: 5px;
`;

const StyledContent = styled.p`
  margin: 0;
  padding: 10px;
`;

type Props = ListElementType;

export const ListElement = ({ content, title }: Props) => (
  <StyledWrapper>
    <StyledTitle>{title}</StyledTitle>
    <StyledContent>{content}</StyledContent>
  </StyledWrapper>
);
