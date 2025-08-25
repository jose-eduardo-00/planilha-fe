import { http } from "../../config";

export default {
  createNotification: async (nome, texto, userId, validade, platform) => {
    try {
      const response = await http.post(
        "/notificacao/criar",
        {
          nome: nome,
          texto: texto,
          userId: userId,
          validade: validade,
          platform: platform,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  getAllNotification: async () => {
    try {
      const response = await http.get("/notificacao/", {
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
};
