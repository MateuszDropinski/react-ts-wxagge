export type ListElementType = {
  id: number;
  title: string;
  content: string;
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const getTitle = (id: number) => `Element number ${id}`;
const getContent = () => {
  const endIndex = Math.floor(Math.random() * content.length) + 1;
  return content.substr(0, endIndex);
};

export const getData = (): Promise<ListElementType[]> =>
  new Promise((resolve) => {
    const result = Array.from({
      length: 100,
    }).map((_, index) => ({
      id: index,
      title: getTitle(index),
      content: getContent(),
    }));
    setTimeout(() => {
      resolve(result);
    }, 1000);
  });
