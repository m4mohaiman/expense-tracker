// utils/paginate.js
export function paginate(data, page, itemsPerPage = 5) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}