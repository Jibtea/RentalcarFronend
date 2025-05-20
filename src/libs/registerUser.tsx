import axios from "axios";
export default async function registerUser(
  userName: string,
  userEmail: string,
  userPassword: string,
  userRole: string) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auths/register",
      {
        name: userName,
        email: userEmail,
        password: userPassword,
        role: userRole
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    return response.data;
  }
  catch (error: any) {
    throw new Error("Cannot register");
  }

}