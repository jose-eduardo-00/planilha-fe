export default {
  createUser: async (name, email, senha) => {
    try {
      const response = await http.post(
        "/users/register",
        {
          name: name,
          email: email,
          senha: senha,
          renda_mensal: "00",
          expoToken: expoToken,
          nivel: 2,
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
};
