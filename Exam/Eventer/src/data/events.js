import { del, get, post, put } from "./request.js";

const endPoints = {
    dashboard: `/data/events?sortBy=_createdOn%20desc`,
    events: `/data/events`,
    eventsById: `/data/events/`,
};

async function getAllEvents() {
    return get(endPoints.dashboard);
}

async function getEventsById(id) {
    return get(endPoints.eventsById + id);
}

async function createEvent(name, imageUrl, category, description, date) {
    return post(endPoints.events, { name, imageUrl, category, description, date });
}

async function updateEvent(id, data) {
    return put(endPoints.eventsById + id, data);
}

async function deleteEvent(id) {
    return del(endPoints.eventsById + id);
}

export {
    getAllEvents,
    getEventsById,
    createEvent,
    updateEvent,
    deleteEvent,
};