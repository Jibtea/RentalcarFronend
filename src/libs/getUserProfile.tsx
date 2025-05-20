import axios from "axios";

export default async function getUserProfile(token: string) {
  try {
    const response = await axios.get("http://localhost:5000/api/auths/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error("Cannot get user profile");
  }
}
