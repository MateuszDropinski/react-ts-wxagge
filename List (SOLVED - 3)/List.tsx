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
  const [filteredElements, setFilteredElements] =
    React.useState<ListElementType[]>(listElements);
  const [openTab, setOpenTab] = React.useState<number | null>(null);
  const [search, setSearch] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const onClick = (id: number) => {
    setOpenTab((actualTab) => (actualTab === id ? null : id));
  };

  const filterElements = React.useCallback(
    _.debounce((listElements: ListElementType[], search: string) => {
      if (!search) {
        return setFilteredElements(listElements);
      }
      setFilteredElements(
        listElements.filter(({ title }) => title.includes(search))
      );
    }, 300),
    []
  );

  React.useEffect(() => {
    filterElements(listElements, search);
  }, [search, listElements]);

  React.useEffect(() => {
    getData().then(setListElements);
  }, []);

  return (
    <StyledWrapper>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onChange}
      />
      {filteredElements.map((listElement) => (
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
