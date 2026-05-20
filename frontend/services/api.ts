const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const getHeaders = (requireAuth = false): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
  }

  return headers;
};

export const api = {
  // auth routes
  register: async (username: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    return data;
  },

  login: async (username: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },

  // movie routes
  searchMovies: async (query: string) => {
    const res = await fetch(
      `${BASE_URL}/movies/search?q=${encodeURIComponent(query)}`,
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Search failed");
    return data;
  },

  getPopularMovies: async () => {
    const res = await fetch(`${BASE_URL}/movies/popular`);
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || "Failed to fetch popular movies");
    return data; 
  },

  getMovieDetails: async (tmdbId: string | number) => {
    const res = await fetch(`${BASE_URL}/movies/${tmdbId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch movie details");
    return data; 
  },

  // activity log
  logMovie: async (logData: {
    tmdbId: number;
    genre: string;
    rating: number;
    review?: string | null;
    isLiked: boolean;
    isRewatch: boolean;
  }) => {
    const res = await fetch(`${BASE_URL}/activity/watch`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(logData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to log movie");
    return data;
  },

  // recommendation routes
  getRecommendations: async () => {
    const res = await fetch(`${BASE_URL}/recommendations`, {
      method: "GET",
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || "Failed to fetch recommendations");
    return data.recommendations;
  },
};
