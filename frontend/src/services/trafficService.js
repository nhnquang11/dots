import axios from "axios";

const baseUrl = "/api/analytic";

const getTraffic = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default { getTraffic };
