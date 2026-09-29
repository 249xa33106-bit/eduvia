const API_BASE = 'http://localhost:5000/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.warn('Backend server offline, fallback to local state:', err);
    return { status: 'offline' };
  }
}

export async function loginUser(email: string) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: 'Offline' };
  }
}

export async function registerUser(data: { name: string; handle: string; campus: string; goal: string }) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: 'Offline' };
  }
}

export async function fetchReels() {
  try {
    const res = await fetch(`${API_BASE}/reels`);
    return await res.json();
  } catch (err) {
    return { success: false, reels: [] };
  }
}

export async function postLikeReel(id: string) {
  try {
    const res = await fetch(`${API_BASE}/reels/${id}/like`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
}

export async function postSaveReel(id: string) {
  try {
    const res = await fetch(`${API_BASE}/reels/${id}/save`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
}

export async function fetchComments(reelId: string) {
  try {
    const res = await fetch(`${API_BASE}/reels/${reelId}/comments`);
    return await res.json();
  } catch (err) {
    return { success: false, comments: [] };
  }
}

export async function postComment(reelId: string, text: string, userName: string, userHandle: string) {
  try {
    const res = await fetch(`${API_BASE}/reels/${reelId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, userName, userHandle })
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
}

export async function evaluateCodeOnServer(userCode: string, topic: string) {
  try {
    const res = await fetch(`${API_BASE}/ai/code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userCode, topic })
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
}

export async function proveSkillOnServer(topic: string) {
  try {
    const res = await fetch(`${API_BASE}/ai/prove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
}
