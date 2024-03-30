import { del, get, post, put } from "./request.js";

const endPoints = {
  dashboard: `/data/cyberpunk?sortBy=_createdOn%20desc`,
  events: `/data/cyberpunk`,
  eventById: `/data/cyberpunk/`,
};

async function getEventById(id) {
  return await get(endPoints.eventById + id); 
}

async function getAllEvents() {
  return await get(endPoints.dashboard);
}

async function createNewEvents(item, imageUrl, price, availability, type, description) {
  return await post(endPoints.events, { item, imageUrl, price, availability, type, description });
}

async function delEvent(id) {
  return await del(endPoints.eventById + id);
}

async function updateEvent(id, data) {
  return await put(endPoints.eventById + id, data);
}

export {
  createNewEvents,
  getEventById,
  getAllEvents,
  delEvent,
  updateEvent,
};