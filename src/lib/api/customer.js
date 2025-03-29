import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBarbers(name) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const url = name
    ? `${API_URL}/auth/barbers/?name=${encodeURIComponent(name)}`
    : `${API_URL}/auth/barbers/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      result.detail ||
      result.non_field_errors?.join(", ") ||
      "Erro ao obter perfil do barbeiro";
    throw new Error(errorMessage);
  }

  return result;
}

export async function getBarberWorkDays(barberId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const url = `${API_URL}/schedule/public/?barber_id=${barberId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    const errorMessage =
      result.detail ||
      (result.non_field_errors ? result.non_field_errors.join(", ") : "") ||
      "Erro ao obter dias de barbeiro";
    throw new Error(errorMessage);
  }

  return result;
}

export async function getSlotsByWorkDay(workdayId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/schedule/available-time-slot/${workdayId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      result.detail ||
      (result.non_field_errors ? result.non_field_errors.join(", ") : "") ||
      "Erro ao obter slots do dia de trabalho";
    throw new Error(errorMessage);
  }

  return result.map(slot => ({
    id: slot.id,
    time: slot.time || slot.start_time || slot.end_time,
    is_available: slot.is_available
  })).filter(slot => slot.is_available);
}

export async function getBarberServices(barberId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const url = `${API_URL}/services/public/?barber_id=${barberId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      result.detail ||
      (result.non_field_errors ? result.non_field_errors.join(", ") : "") ||
      "Erro ao obter os serviços do barbeiro";
    throw new Error(errorMessage);
  }

  return result;
}

export async function createAppointment(serviceId, timeSlotId, barberId, clientId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const url = `${API_URL}/appointments/create/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify({
      service_id: serviceId,
      time_slot_id: timeSlotId,
      barber_id: barberId,
      client_id: clientId,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      result.detail ||
      (result.non_field_errors ? result.non_field_errors.join(", ") : "") ||
      "Erro ao criar o agendamento";
    throw new Error(errorMessage);
  }

  return result;
}