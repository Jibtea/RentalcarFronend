import axios from "axios";
export default async function getCarProviders() {
  try {
    const response = await axios.get("http://localhost:5000/api/carProviders", {
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error("Cannot get car providers");
  }
}