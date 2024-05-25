import { createAxios } from "./instance";
const axios = createAxios();

import addQuery from "../utils/addQuery";

export default {
  searchMusic: async (payload) => {
    const result = await addQuery(payload);

    return axios.api.get(`/music?${result}`).then((response) => response.data);
  },
};
