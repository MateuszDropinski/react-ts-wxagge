# Tło zadania

Klient dostarcza przez API listę elementów, posiadających tytuł oraz zawartość, którą chce wylistować. W pliku `data.ts` znajduje się typ mówiący o tym jak wygląda pojedynczy element dostarczany przez funkcję `getData`, która imituje klienckie API.

### Zadania:

1. Chcemy pobrać listę elementów za pierwszym razem kiedy komponent `List.tsx` się wyrenderuje i wylistować ją w komponencie `List.tsx` wykorzystując komponent `ListElement.tsx`.
2. Przez dużą liczbę elementów klient poprosił, żeby zawartość każdego elementu była domyślnie schowana, dopiero na kliknięcie tytułu zawartość danego elementu ma się pojawić. Po ponownym kliknięciu zawartość powinna się schować. Dodatkowo tylko jeden element może być rozwinięty, czyli po rozwinięciu innego elementu poprzedni ma się zwinąć.
3. Klient poprosił, żeby nad listą elementów dodać kontrolkę do wpisania tekstu na podstawie którego lista będzie filtrowana. Przy braku wartości w kontrolce chcemy pokazywać wszystkie elementy. Chcemy filtrować tylko na podstawie tytułu elementu.
4. Firma klienta ciągle dodaje nowe elementy do aplikacji przez co lista elementów znacznie się zwiększyła (_Należy podmienić w pliku `data.ts` 100 na 10000 w linii 19_). Dostrzeżono, że rozwijanie elementów trwa zbyt długo mimo, że elementy same w sobie nic nie robią tylko wyświetlają informacje. Należy poprawić wydajność listy.

---

## Część do usunięcia przed rekrutacją:

### Dodatkowe informacje:

W projekcie istnieje 5 folderów, 4 z nich z napisem **Solved** są wykonane do podanego zadania. Dzięki temu jeśli chcemy pominąć zadanie 1 i 2 możemy zostawić jedynie folder List (SOLVED - 2) a resztę usunąć i zacząć od zadania 3 i 4.

Możemy również pominąć zadanie 3 i przejść od razu do 4.

W przypadku zadania 4 istnieje możliwość, że osoba rozwiąże to na poprzednich etapach.

Poniższe rozwiązania są jedynie przykładowe, przez co czasem zadanie lub przygotowane rozwiązanie może być nieadekwatne.

### O co można dopytać przy zadaniu:

1. Pobranie elementów
   1. typowanie useState, kiedy trzeba a kiedy nie trzeba
   2. indeksowanie listy komponentów, czemu nie korzystać z indexu zwracanego przez funkcje map
   3. Typowanie Propsów, wcześniej korzystano z React.FC ale od 18 trzeba inaczej
2. Zwijanie i rozwijanie elementów
   1. ???
3. Filtrowanie elementów
   1. jeśli nie zostanie wykorzystany debounce można dopytać
4. Performance
   1. jakie inne rozwiązania można zaproponować klientowi żeby poprawić czas renderowania (infinite scroll/wirtualizacja/paginacja/etc.)

### Przykładowe rozwiązania:

1. Pobranie elementów + wyrenderowanie ich

`List.tsx`

- Pobranie elementów listy w

```
const [
  listElements,
  setListElements
] = React.useState<ListElementType[]>([]);

React.useEffect(() => {
  getData().then(setListElements);
}, []);
```

- Wyrenderowanie elementów listy

```
<StyledWrapper>
  {listElements.map((listElement) => (
    <ListElement key={listElement.id} {...listElement} />
  ))}
</StyledWrapper>
```

`ListElement.tsx`

- Przerobienie komponentu, żeby wykorzystywał otrzymane propsy i otypowanie komponentu

```
type Props = ListElementType;

export const ListElement = ({ content, title }: Props) => (
  <StyledWrapper>
    <StyledTitle>{title}</StyledTitle>
    <StyledContent>{content}</StyledContent>
  </StyledWrapper>
);
```

2. Dodanie logiki zwijania elementów listy

`List.tsx`

- Dodanie state'u i onClick'a do ustawiania aktualnie otwartego elementu

```
const [openTab, setOpenTab] = React.useState<number | null>(null);

const onClick = (id: number) => {
    setOpenTab((actualTab) => (actualTab === id ? null : id));
};
```

- Przekazanie onClick'a do komponentu i informacji o tym czy powinien być otwarty

```
<ListElement
  key={listElement.id}
  onClick={onClick}
  isOpen={openTab === listElement.id}
  {...listElement}
/>
```

`ListElement.tsx`

- Dodanie onClick na elemencie + renderowanie zawartości w zależności od tego czy element jest otwarty

```
type Props = ListElementType & {
  isOpen: boolean;
  onClick: (id: number) => void;
};

export const ListElement = ({ id, content, title, isOpen, onClick }: Props) => (
  <StyledWrapper onClick={() => onClick(id)}>
    <StyledTitle>{title}</StyledTitle>
    {isOpen && <StyledContent>{content}</StyledContent>}
  </StyledWrapper>
);
```

3. Szukanie elementów

`List.tsx`

- Dodanie kontrolki input i obsługa jej

```
const [search, setSearch] = React.useState('');

const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

[...]

<StyledWrapper>
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={onChange}
  />
  {...}
</StyledWrapper>
```

- Dodanie nowego state'a, który trzyma liste przefiltrowanych elementów, logika filtrowania i podmiana listy na podstawie której elementy są wyświetlane

```
const [
    filteredElements,
    setFilteredElements
] = React.useState<ListElementType[]>(listElements);

[...]

const filterElements = React.useCallback(
    _.debounce((listElements: ListElementType[], search: string) => {
      if (!search) {
        return setFilteredElements(listElements);
      }
      setFilteredElements(listElements.filter(({ title }) => title.includes(search)));
    }, 300),
    []
);

React.useEffect(() => {
    filterElements(listElements, search);
}, [search, listElements]);

[...]

{filteredElements.map((listElement) => (
    <ListElement
      key={listElement.id}
      onClick={onClick}
      isOpen={openTab === listElement.id}
      {...listElement}
    />
))}
```

4. Poprawienie renderowania `ListElement.tsx`

`List.tsx`

- Opakowanie funkcji onClick w React.useCallback

```
const onClick = React.useCallback((id: number) => {
    setOpenTab((actualTab) => (actualTab === id ? null : id));
}, []);
```

`ListElement.tsx`

- Opakowanie komponentu w React.memo

```
export const ListElement = React.memo(
  ({ id, title, content, isOpen, onClick }: Props) => (
    <StyledWrapper onClick={() => onClick(id)}>
      <StyledTitle>{title}</StyledTitle>
      {isOpen && <StyledContent>{content}</StyledContent>}
    </StyledWrapper>
  )
);

```
