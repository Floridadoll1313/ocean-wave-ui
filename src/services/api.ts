const API_URL = import.meta.env.VITE_API_URL;

export interface ChatResponse {
  text: string;
}

export interface LeadPayload {
  email: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface LeadResponse {
  success: boolean;
  data: unknown;
}

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function sendChat(message: string): Promise<ChatResponse> {
  return request<ChatResponse>("/chat", { message });
}

export async function createLead(payload: LeadPayload): Promise<LeadResponse> {
  return request<LeadResponse>("/leads", payload);
}