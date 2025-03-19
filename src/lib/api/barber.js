import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBarberStatistics() {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/appointments/barber/statistics/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.non_field_errors);
  }
  return result;
}

export async function getBarberServices() {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/services/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.non_field_errors);
  }
  return result;
}

export async function getServiceById(serviceId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/services/${serviceId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.non_field_errors || "Erro ao buscar o serviço");
  }

  return result;
}

export async function createService(data) {
  console.log(data)
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/services/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
    body: data,
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      result.non_field_errors
        ? result.non_field_errors.join(", ")
        : "Erro desconhecido"
    );
  }
  return result;
}

export async function updateService(serviceId, data) {
  console.log(data);
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/services/${serviceId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
    body: data,
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      result.non_field_errors
        ? result.non_field_errors.join(", ")
        : "Erro desconhecido"
    );
  }
  return result;
}

export async function deleteService(serviceId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/services/${serviceId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.non_field_errors || "Erro ao deletar o serviço");
  }

  return { message: "Serviço deletado com sucesso!" };
}