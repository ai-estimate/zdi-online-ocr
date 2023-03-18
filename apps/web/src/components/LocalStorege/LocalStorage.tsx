let localStorage: any = {getItem: () => null, setItem: () => null};
if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}
export const setItemToLocalStorage = (key: string, value: any) => {
  // get data from local storage
  const data = JSON?.parse(localStorage.getItem('docs') || '[]');

  // remove if the same id
  const newData = data?.filter((item: any) => item.id != value.id);
  newData.push(value);

  // set new data to local storage
  localStorage.setItem(key, JSON.stringify(newData));
};
