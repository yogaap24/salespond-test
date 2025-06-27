const BASE_URL = '';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

export async function getContacts(params = new URLSearchParams()) {
  const response = await fetch(`${BASE_URL}/api/v1/contacts?${params.toString()}`);
  return handleResponse(response);
}

export async function getCallLogs(params = new URLSearchParams()) {
  const response = await fetch(`${BASE_URL}/api/v1/call-logs?${params.toString()}`);
  return handleResponse(response);
}

export async function toggleFavorite(contactId, isFavorite) {
  const response = await fetch(`${BASE_URL}/api/v1/contacts/${contactId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ is_favorite: isFavorite }),
  });
  return handleResponse(response);
}

export async function createCallLog(contactId) {
  const response = await fetch(`${BASE_URL}/api/v1/call-logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ contact_id: contactId }),
  });
  return handleResponse(response);
}