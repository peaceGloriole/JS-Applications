const url = `http://localhost:3030/jsonstore/collections/books`;

import { dataApi } from '../request.js';

async function getAllBooks() {
  return await dataApi.get(url);
}

async function postNewBook(data) {
  return await dataApi.post(url, data);
}

async function updateBook(data) {
  return await dataApi.update(url, data);
}

export const dataService = {
  getAllBooks,
  postNewBook,
  updateBook
}