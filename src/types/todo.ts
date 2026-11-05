export type TodoStatus = "pending" | "completed";

export interface Todo {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: TodoStatus;
  createdAt: string;
}

// Generic type sederhana untuk membungkus data
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Type alias untuk filter daftar tugas
export type TodoFilter = "all" | "pending" | "completed";