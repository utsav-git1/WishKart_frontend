import axios from "axios";

const BASE_URL = "https://wishkart-backend.onrender.com/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzdjN2Y2ZWRhZTcwNjVmZDFjY2JhOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTUyOTYxNCwiZXhwIjoxNjgxNzg4ODE0fQ.ROINZyQ7lCa1D_tUBgn_xyn2eyYVHQQv2Gb6hXh2SJs";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  header: `Bearer ${TOKEN}`,
});
