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
  const [listElements, setListElements] = React.useState<ListElementType[]>([]);
  const [openTab, setOpenTab] = React.useState<number | null>(null);

  const onClick = (id: number) => {
    setOpenTab((actualTab) => (actualTab === id ? null : id));
  };

  React.useEffect(() => {
    getData().then(setListElements);
  }, []);

  return (
    <StyledWrapper>
      {listElements.map((listElement) => (
        <ListElement
          key={listElement.id}
          onClick={onClick}
          isOpen={openTab === listElement.id}
          {...listElement}
        />
      ))}
    </StyledWrapper>
  );
};
