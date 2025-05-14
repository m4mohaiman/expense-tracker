export function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveToLocalStorage(key, newItem) {
  const existingData = getFromLocalStorage(key);
  existingData.push(newItem);
  localStorage.setItem(key, JSON.stringify(existingData));
}