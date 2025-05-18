// story.js
import { BASE_URL } from './config';

export async function getStories(token) {
  const response = await fetch(`${BASE_URL}/stories`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data.listStory;
}

export async function getDetailStory(token, id) {
  const response = await fetch(`${BASE_URL}/stories/${id}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data.story;
}

export async function addNewStory(token, { description, photo, lat, lon }) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat !== undefined) formData.append('lat', lat);
  if (lon !== undefined) formData.append('lon', lon);

  const response = await fetch(`${BASE_URL}/stories`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function addNewStoryGuest({ description, photo, lat, lon }) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat !== undefined) formData.append('lat', lat);
  if (lon !== undefined) formData.append('lon', lon);

  const response = await fetch(`${BASE_URL}/stories/guest`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data;
}
