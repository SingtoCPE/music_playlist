import { createAxios } from "./instance";
const axios = createAxios();

import addQuery from "../utils/addQuery";

export default {
  createPlaylistItem: async (payload) => {
    return axios.api
      .post(`/playlist/playlistItems`, payload)
      .then((response) => response.data);
  },

  getOne: async (id) => {
    return axios.api.get(`/playlist/${id}`).then((response) => response.data);
  },

  update: async (id, payload) => {
    return axios.api
      .put(`/playlist/${id}`, payload)
      .then((response) => response.data);
  },

  removePlaylistItem: async (id) => {
    return axios.api
      .delete(`/playlist/playlistItems/${id}`)
      .then((response) => response.data);
  },
};
