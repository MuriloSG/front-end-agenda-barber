import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Obtém o perfil do cliente logado
 * @returns {Promise<Object>} - Retorna os dados do perfil do cliente
 * @throws {Error} - Lança erro se o token for inválido ou não existir
 */
export async function getCustomerProfile() {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/auth/profile/`, {
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

/**
 * Atualiza o perfil do cliente
 * @param {FormData} data - Dados do perfil a serem atualizados
 * @returns {Promise<Object>} - Retorna os dados atualizados do perfil
 * @throws {Error} - Lança erro se o token for inválido ou os dados forem incorretos
 */
export async function updateCustomerProfile(data) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/auth/profile/`, {
    method: "PATCH",
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

/**
 * Obtém a lista de barbeiros disponíveis
 * @param {string} [name] - Nome do barbeiro para filtrar (opcional)
 * @returns {Promise<Array>} - Retorna lista de barbeiros
 * @throws {Error} - Lança erro se não for possível buscar os barbeiros
 */
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

/**
 * Obtém os dias de trabalho de um barbeiro específico
 * @param {number} barberId - ID do barbeiro
 * @returns {Promise<Array>} - Retorna lista de dias de trabalho
 * @throws {Error} - Lança erro se não for possível obter os dias de trabalho
 */
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

/**
 * Obtém os horários disponíveis de um dia de trabalho
 * @param {number} workdayId - ID do dia de trabalho
 * @returns {Promise<Array>} - Retorna lista de horários disponíveis
 * @throws {Error} - Lança erro se não for possível obter os horários
 */
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

/**
 * Obtém os serviços disponíveis de um barbeiro
 * @param {number} barberId - ID do barbeiro
 * @returns {Promise<Array>} - Retorna lista de serviços
 * @throws {Error} - Lança erro se não for possível obter os serviços
 */
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

/**
 * Cria um novo agendamento
 * @param {number} serviceId - ID do serviço
 * @param {number} timeSlotId - ID do horário
 * @param {number} barberId - ID do barbeiro
 * @param {number} clientId - ID do cliente
 * @returns {Promise<Object>} - Retorna os dados do agendamento criado
 * @throws {Error} - Lança erro se não for possível criar o agendamento
 */
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

/**
 * Cancela um agendamento
 * @param {number} appointmentId - ID do agendamento
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se não for possível cancelar o agendamento
 */
export async function cancelAppointment(appointmentId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(
    `${API_URL}/appointments/cancel/${appointmentId}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      result.detail ||
      result.non_field_errors?.join(", ") ||
      "Erro ao cancelar o agendamento";
    throw new Error(errorMessage);
  }

  return result;
}

/**
 * Obtém os agendamentos do cliente com filtros opcionais
 * @param {string} [status] - Status do agendamento (opcional)
 * @param {string} [barberName] - Nome do barbeiro (opcional)
 * @param {string} [day] - Data do agendamento (opcional)
 * @returns {Promise<Array>} - Retorna lista de agendamentos
 * @throws {Error} - Lança erro se não for possível buscar os agendamentos
 */
export async function getCustomerAppointments(status, barberName, day) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }
  const url = new URL(`${API_URL}/appointments/client/appointments/`);
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (barberName) params.append("barber_name", barberName);
  if (day) params.append("day", day);
  url.search = params.toString();
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
      "Erro ao buscar agendamentos";
    throw new Error(errorMessage);
  }

  return result;
}