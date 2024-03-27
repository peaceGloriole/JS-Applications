import { get, post } from "./request.js";

const endPoints = {
    dashboard: `/data/motorcycles?sortBy=_createdOn%20desc`,
    events: `/data/motorcycles`,
    eventById: `/data/motorcycles/`,
};

async function getEventById(id) {
    return get(endPoints.eventById + id); 
}

async function getAllEvents() {
    return get(endPoints.dashboard);
}

async function createNewEvents(model, imageUrl ,year ,mileage ,contact ,about) {
    return post(endPoints.events, { model, imageUrl ,year ,mileage ,contact ,about });
}

export {
    createNewEvents,
    getEventById,
    getAllEvents
};