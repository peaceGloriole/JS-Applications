import { api } from '../requester.js';

const BASE_URL = `http://localhost:3030/data`;
const endPoints = {
  allFurniture: `/catalog`,
  myFurniture: (userId) => `/catalog?where=_ownerId%3D%22${userId}%22`
}

async function createFurniture(data) {
  return await api.post(BASE_URL + endPoints.allFurniture, data);
}

async function getAllFurniture() {
  return await api.get(BASE_URL + endPoints.allFurniture);
}

async function getFurnitureDetails(id) {
  return await api.get(BASE_URL + endPoints.allFurniture + `/${id}`);
}

async function deleteFurniture(id) {
  return await api.del(BASE_URL + endPoints.allFurniture + `/${id}`);
}

async function getMyFurniture(userId) {
  return await api.get(BASE_URL + endPoints.myFurniture(userId));
}

async function updateFurniture(id, data) {
  return await api.put(BASE_URL + endPoints.allFurniture + `/${id}`, data);

}

export const dataService = {
  createFurniture,
  getAllFurniture,
  getFurnitureDetails,
  deleteFurniture,
  getMyFurniture,
  updateFurniture
};