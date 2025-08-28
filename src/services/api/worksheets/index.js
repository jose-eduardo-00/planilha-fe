import { http } from "../../config";

export default {
  getMyWorkSheets: async (id) => {
    try {
      const response = await http.get(`/planilha/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  createWorkSheets: async (nome, id) => {
    try {
      const response = await http.post(
        `/planilha/register`,
        {
          nome,
          userId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
};
