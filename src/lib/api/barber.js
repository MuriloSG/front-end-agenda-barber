import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBarberStatistics() {
    const TOKEN = Cookies.get("token");
    console.log(TOKEN)
    if (!TOKEN) {
      throw new Error("Token não encontrado nos cookies");
    }

    const response = await fetch(`${API_URL}/appointments/barber/statistics/`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${TOKEN}`,
        },
    });
    console.log(response)
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.non_field_errors);
    }
    return result;
}
