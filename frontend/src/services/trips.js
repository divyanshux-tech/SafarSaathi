import api from "./api";

// Trip service - wraps backend /api/trips endpoints
// Auth via JWT in api interceptor, VITE_API_BASE_URL from env

export async function createTrip(payload) {
  const res = await api.post("/api/trips", payload);
  return res.data;
}

export async function getTrips() {
  const res = await api.get("/api/trips");
  return res.data;
}

export async function getTripById(tripId) {
  const res = await api.get(`/api/trips/${tripId}`);
  return res.data;
}

export async function updateTrip(tripId, payload) {
  const res = await api.put(`/api/trips/${tripId}`, payload);
  return res.data;
}

export async function deleteTrip(tripId) {
  const res = await api.delete(`/api/trips/${tripId}`);
  return res.data; // 204 returns empty
}
