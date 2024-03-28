import { del, get, post, put } from "./request.js";

const endPoints = {
  dashboard: `/data/motorcycles?sortBy=_createdOn%20desc`,
  events: `/data/motorcycles`,
  eventById: `/data/motorcycles/`,
};

async function getEventById(id) {
  return await get(endPoints.eventById + id); 
}

async function getAllEvents() {
  return await get(endPoints.dashboard);
}

async function createNewEvents(model, imageUrl ,year ,mileage ,contact ,about) {
  return await post(endPoints.events, { model, imageUrl ,year ,mileage ,contact ,about });
}

async function delEvent(id) {
  return await del(endPoints.eventById + id);
}

async function updateEvent(id, data) {
  console.log(id, data);
  return await put(endPoints.eventById + id, data);
}

export {
  createNewEvents,
  getEventById,
  getAllEvents,
  delEvent,
  updateEvent
};