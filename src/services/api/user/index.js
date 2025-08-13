import { http } from "../../config";

export default {
  editUser: async (id, name, email, avatar) => {
    try {
      const formData = new FormData();
      if (avatar) {
        formData.append("avatar", avatar);
      }
      formData.append("name", name);
      formData.append("email", email);

      const response = await http.put(`/users/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,PUT",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  editBaseData: async (id, salario, outrasFontes) => {
    try {
      const response = await http.put(
        `/users/update-data/${id}`,
        {
          salario: salario,
          outras_fontes: outrasFontes,
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
  getAllUsers: async () => {
    try {
      const response = await http.get(`/users/`, {
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
  editStatusUser: async (id, status) => {
    try {
      const response = await http.put(
        `/users/update-status/${id}`,
        { status },
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
  deleteUser: async (id) => {
    try {
      const response = await http.delete(`/users/delete/${id}`, {
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
};
