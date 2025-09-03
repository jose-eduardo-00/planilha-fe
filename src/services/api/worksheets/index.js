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
  getMyWorkSheet: async (id) => {
    try {
      const response = await http.get(`/planilha/byId/${id}`, {
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
  createLine: async (idWorkSheet, nome, tipo, data, valor) => {
    try {
      const response = await http.post(
        `/planilha/${idWorkSheet}/linhas`,
        {
          nome,
          tipo,
          data,
          valor,
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
