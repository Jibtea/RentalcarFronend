import axios from 'axios';
export default async function userLogin(userEmail: string, userPassword: string) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auths/login",
      {
        email: userEmail,
        password: userPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
}