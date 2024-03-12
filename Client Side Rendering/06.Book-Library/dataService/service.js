const url = `http://localhost:3030/jsonstore/collections/books`;

import { dataApi } from '../request.js';

async function getAllBooks() {
  return await dataApi.get(url);
}

async function postNewBook(data) {
  return await dataApi.post(url, data);
}

async function updateBook(id, data) {
  const updatedUrl = `${url}/${id}`;
  return await dataApi.update(updatedUrl, data);
}

export const dataService = {
  getAllBooks,
  postNewBook,
  updateBook
}