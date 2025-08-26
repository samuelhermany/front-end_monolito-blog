import axios from 'axios'

// Base URL do seu backend Java/Spring
const API_BASE_URL = 'http://localhost:8080/api/v1'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  authors: {
    list: () => apiClient.get('/authors'),
    get: (id: number) => apiClient.get(`/authors/${id}`),
    create: (data: any) => apiClient.post('/authors', data),
    update: (id: number, data: any) => apiClient.put(`/authors/${id}`, data),
    delete: (id: number) => apiClient.delete(`/authors/${id}`),
  },
}
