import * as React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { ListElement } from './ListElement';
import { getData, ListElementType } from '../data';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;

  font-family: Arial, sans-serif;
`;

export const List = () => {
  return (
    <StyledWrapper>
      <ListElement />
    </StyledWrapper>
  );
};
