import axios from "axios";

// Crear una instancia de Axios
const api = axios.create({  
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ajusta según tu API
  timeout: 10000, // 10 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token en el header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error en la API:", error.response.data.message || error.message);
      
      // Si el token expira o el usuario no está autorizado, redirigir al login
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirigir a la página de login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
