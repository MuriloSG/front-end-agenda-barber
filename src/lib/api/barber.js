import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Obtém o perfil do barbeiro logado
 * @returns {Promise<Object>} - Retorna os dados do perfil do barbeiro
 * @throws {Error} - Lança erro se o token for inválido ou não existir
 */
export async function getBarberProfile() {
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
 * Atualiza o perfil do barbeiro
 * @param {FormData} data - Dados do perfil a serem atualizados
 * @returns {Promise<Object>} - Retorna os dados atualizados do perfil
 * @throws {Error} - Lança erro se o token for inválido ou os dados forem incorretos
 */
export async function updateBarberProfile(data) {
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
 * Obtém estatísticas do barbeiro
 * @returns {Promise<Object>} - Retorna estatísticas 
 * @throws {Error} - Lança erro se o token for inválido
 */
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

/**
 * Obtém todos os serviços do barbeiro
 * @returns {Promise<Array>} - Retorna lista de serviços
 * @throws {Error} - Lança erro se o token for inválido
 */
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

/**
 * Obtém um serviço específico pelo ID
 * @param {number} serviceId - ID do serviço
 * @returns {Promise<Object>} - Retorna os dados do serviço
 * @throws {Error} - Lança erro se o serviço não for encontrado
 */
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

/**
 * Cria um novo serviço
 * @param {FormData} data - Dados do serviço a ser criado
 * @returns {Promise<Object>} - Retorna os dados do serviço criado
 * @throws {Error} - Lança erro se os dados forem inválidos
 */
export async function createService(data) {
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

/**
 * Atualiza um serviço existente
 * @param {number} serviceId - ID do serviço
 * @param {FormData} data - Dados atualizados do serviço
 * @returns {Promise<Object>} - Retorna os dados do serviço atualizado
 * @throws {Error} - Lança erro se os dados forem inválidos
 */
export async function updateService(serviceId, data) {
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

/**
 * Deleta um serviço
 * @param {number} serviceId - ID do serviço
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se o serviço não puder ser deletado
 */
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

/**
 * Obtém todos os dias de trabalho do barbeiro
 * @returns {Promise<Array>} - Retorna lista de dias de trabalho
 * @throws {Error} - Lança erro se o token for inválido
 */
export async function getBarberWorkDays() {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/schedule/`, {
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

/**
 * Obtém um dia de trabalho específico
 * @param {number} work_day_id - ID do dia de trabalho
 * @returns {Promise<Object>} - Retorna os dados do dia de trabalho
 * @throws {Error} - Lança erro se o dia não for encontrado
 */
export async function getWorkDay(work_day_id) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/schedule/${work_day_id}/`, {
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

/**
 * Cria um novo dia de trabalho
 * @param {Object} data - Dados do dia de trabalho
 * @returns {Promise<Object>} - Retorna os dados do dia criado
 * @throws {Error} - Lança erro se os dados forem inválidos
 */
export async function createWorkDay(data) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/schedule/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      result.detail ||
      result.non_field_errors?.join(", ") ||
      Object.values(result).flat().join(", ");

    throw new Error(errorMessage);
  }

  return result;
}

/**
 * Atualiza um dia de trabalho existente
 * @param {number} work_day_id - ID do dia de trabalho
 * @param {Object} data - Dados atualizados do dia
 * @returns {Promise<Object>} - Retorna os dados do dia atualizado
 * @throws {Error} - Lança erro se os dados forem inválidos
 */
export async function updateWorkDay(work_day_id, data) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) throw new Error("Token não encontrado");

  const response = await fetch(`${API_URL}/schedule/${work_day_id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    const errorMessage =
      result.day_of_week?.[0] || result.detail || "Erro desconhecido";
    throw new Error(errorMessage);
  }
  return result;
}

/**
 * Deleta um dia de trabalho
 * @param {number} work_day_id - ID do dia de trabalho
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se o dia não puder ser deletado
 */
export async function deleteWorkDay(work_day_id) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/schedule/${work_day_id}/`, {
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

/**
 * Obtém os horários disponíveis de um dia de trabalho
 * @param {number} work_day_id - ID do dia de trabalho
 * @returns {Promise<Array>} - Retorna lista de horários disponíveis
 * @throws {Error} - Lança erro se o dia não for encontrado
 */
export async function getSlotsWorkDay(work_day_id) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/schedule/available-time-slot/${work_day_id}/`, {
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

/**
 * Reativa todos os horários de um dia de trabalho
 * @param {number} work_day_id - ID do dia de trabalho
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se não for possível reativar os horários
 */
export async function reactivateAllSlotsWorkDay(work_day_id) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(
    `${API_URL}/schedule/generate-slots/${work_day_id}/`,
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
    throw new Error(result.detail || "Erro ao reativar horários");
  }
  return result;
}

/**
 * Desativa todos os horários de um dia de trabalho
 * @param {number} work_day_id - ID do dia de trabalho
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se não for possível desativar os horários
 */
export async function deactivateAllSlotsWorkDay(work_day_id) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(
    `${API_URL}/schedule/delete-slots/${work_day_id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`,
      },
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.detail || "Erro ao desativar horários");
  }
  return result;
}

/**
 * Deleta um horário específico de um dia de trabalho
 * @param {number} work_day_id - ID do dia de trabalho
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se não for possível deletar o horário
 */
export async function deleteSlotsWorkDay(work_day_id) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(`${API_URL}/schedule/delete-time-slot/${work_day_id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`,
      },
    }
  );
  if (response.ok) {
    return { success: true };
  }
  const result = await response.json();
  throw new Error(result.non_field_errors);
}

/**
 * Obtém os agendamentos do barbeiro com filtros opcionais
 * @param {string} [status] - Status do agendamento (opcional)
 * @param {string} [clientName] - Nome do cliente (opcional)
 * @param {string} [day] - Data do agendamento (opcional)
 * @returns {Promise<Array>} - Retorna lista de agendamentos
 * @throws {Error} - Lança erro se não for possível buscar os agendamentos
 */
export async function getBarberAppointments(status, clientName, day) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }
  const url = new URL(`${API_URL}/appointments/barber/appointments/`);
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (clientName) params.append("client_name", clientName);
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

/**
 * Confirma um agendamento
 * @param {number} appointmentId - ID do agendamento
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se não for possível confirmar o agendamento
 */
export async function confirmAppointment(appointmentId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(
    `${API_URL}/appointments/confirm/${appointmentId}/`,
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
      "Erro ao confirmar o agendamento";
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
 * Marca um agendamento como concluído
 * @param {number} appointmentId - ID do agendamento
 * @returns {Promise<Object>} - Retorna mensagem de sucesso
 * @throws {Error} - Lança erro se não for possível marcar o agendamento como concluído
 */
export async function completeAppointment(appointmentId) {
  const TOKEN = Cookies.get("token");
  if (!TOKEN) {
    throw new Error("Token não encontrado nos cookies");
  }

  const response = await fetch(
    `${API_URL}/appointments/complete/${appointmentId}/`,
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
      "Erro ao marcar o agendamento como atendido";
    throw new Error(errorMessage);
  }

  return result;
}
