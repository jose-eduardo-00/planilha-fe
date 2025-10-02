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
  updateLine: async (id, nome, tipo, data, valor) => {
    try {
      const response = await http.put(
        `/planilha/edit-linha/${id}`,
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
            "Access-Control-Allow-Methods": "OPTIONS,PUT",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  deleteWorksheet: async (id) => {
    try {
      const response = await http.delete(`/planilha/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,DELETE",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  deleteLine: async (id) => {
    try {
      const response = await http.delete(`/planilha/delete-linha/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,DELETE",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  updateWorksheet: async (id, nome, descricao) => {
    try {
      const response = await http.put(
        `/planilha/edit/${id}`,
        {
          nome,
          descricao,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,PUT",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
};
