import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Sun, Moon, Plus, Pencil, Trash2, Check, ArrowDown, ListTodo, CheckSquare } from "lucide-react";
import "./App.css";

import type { Todo, TodoFilter, TodoStatus } from "./types/todo";

const STORAGE_KEY = "todolist-adi";
const THEME_KEY = "todolist-theme";

const APP_VERSION: string = import.meta.env.VITE_APP_VERSION || "1.0.0";

function App() {
  // ==========================================
  // TITLE BROWSER & THEME
  // ==========================================

  useEffect(() => {
    document.title = "TodoList";
  }, []);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  // ==========================================
  // TODO DATA
  // ==========================================

  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos) as Todo[];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalTasks: number = todos.length;

  const completedTasks: number = todos.filter(
    (todo) => todo.status === "completed"
  ).length;

  const pendingTasks: number = totalTasks - completedTasks;

  // ==========================================
  // FILTER TASKS
  // ==========================================

  const filteredTodos = useMemo(() => {
    if (filter === "pending") {
      return todos.filter((todo) => todo.status === "pending");
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.status === "completed");
    }

    return todos;
  }, [todos, filter]);

  // ==========================================
  // FORM HANDLER
  // ==========================================

  function resetForm() {
    setTitle("");
    setDescription("");
    setDeadline("");
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Judul tugas wajib diisi.");
      return;
    }

    if (editingId !== null) {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                title: title.trim(),
                description: description.trim(),
                deadline,
              }
            : todo
        )
      );
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        deadline,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      setTodos((currentTodos) => [newTodo, ...currentTodos]);
    }

    resetForm();
  }

  function handleEdit(todo: Todo) {
    setTitle(todo.title);
    setDescription(todo.description);
    setDeadline(todo.deadline);
    setEditingId(todo.id);
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus tugas ini?"
    );

    if (confirmed) {
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    }
  }

  function toggleStatus(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id !== id) return todo;

        const newStatus: TodoStatus =
          todo.status === "completed" ? "pending" : "completed";

        return {
          ...todo,
          status: newStatus,
        };
      })
    );
  }

  function formatDeadline(date: string): string {
    if (!date) return "Tidak ada deadline";

    return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <main className="app-container">
      {/* HEADER COMPACT */}
      <header className="top-header">
        <div className="brand-logo">
          <CheckSquare size={22} className="brand-icon" />
          <h1 className="brand-title">TodoList</h1>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title="Ganti Tema"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-tag">
          <span className="tag-dot"></span>
          APLIKASI MANAJEMEN TUGAS KULIAH
        </div>

        <h1>
          Satu Tempat.
          <br />
          <span>Semua Tugas Teratur.</span>
        </h1>

        <p className="hero-description">
          Aplikasi sederhana untuk membantu mahasiswa mengelola tugas kuliah
          dengan lebih mudah dan terorganisir. Tambahkan tugas, atur deadline,
          perbarui informasi, dan pantau status penyelesaiannya dalam satu
          tempat.
        </p>

        <div className="hero-actions">
          <a href="#task-manager" className="hero-button">
            Mulai Kelola Tugas <ArrowDown size={17} />
          </a>

          <span className="hero-note">Catat · Atur · Selesaikan</span>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon purple">
            <ListTodo size={21} />
          </span>

          <div>
            <p>Total Tugas</p>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon orange">
            <span>◷</span>
          </span>

          <div>
            <p>Belum Selesai</p>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon green">
            <Check size={21} />
          </span>

          <div>
            <p>Selesai</p>
            <h2>{completedTasks}</h2>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="content-grid" id="task-manager">
        {/* FORM */}
        <div className="form-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TASK MANAGER</span>
              <h2>{editingId !== null ? "Edit Tugas" : "Tambah Tugas"}</h2>
            </div>

            <button
              className="heading-icon"
              type="button"
              onClick={resetForm}
              aria-label="Tambah tugas baru"
              title="Tambah tugas baru"
            >
              <Plus size={21} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="task-title">Nama Tugas</label>
            <input
              id="task-title"
              type="text"
              placeholder="Contoh: Mengerjakan tugas PAW"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="task-description">Deskripsi</label>
            <textarea
              id="task-description"
              placeholder="Tambahkan detail tugas..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
            />

            <label htmlFor="task-deadline">Deadline</label>
            <input
              id="task-deadline"
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
            />

            <button className="submit-button" type="submit">
              {editingId !== null ? (
                "Simpan Perubahan"
              ) : (
                <>
                  <Plus size={17} /> Tambah Tugas
                </>
              )}
            </button>

            {editingId !== null && (
              <button
                className="cancel-button"
                type="button"
                onClick={resetForm}
              >
                Batal Edit
              </button>
            )}
          </form>
        </div>

        {/* TASK LIST */}
        <div className="tasks-section">
          <div className="section-heading tasks-heading">
            <div>
              <span className="eyebrow">YOUR ACTIVITIES</span>
              <h2>Daftar Tugas</h2>
            </div>

            <span className="task-count">{totalTasks} tugas</span>
          </div>

          {/* FILTER */}
          <div className="filter-tabs">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Semua
            </button>

            <button
              type="button"
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Belum Selesai
            </button>

            <button
              type="button"
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Selesai
            </button>
          </div>

          {/* TASK ITEMS */}
          <div className="task-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <h3>Belum ada tugas</h3>
                <p>
                  {filter === "all"
                    ? "Tambahkan tugas pertamamu melalui formulir."
                    : "Tidak ada tugas dalam kategori ini."}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <article className="task-item" key={todo.id}>
                  <button
                    type="button"
                    className={`status-check ${todo.status}`}
                    onClick={() => toggleStatus(todo.id)}
                    aria-label="Ubah status tugas"
                    title="Ubah status tugas"
                  >
                    {todo.status === "completed" && <Check size={16} />}
                  </button>

                  <div className="task-details">
                    <h3 className={todo.status === "completed" ? "done" : ""}>
                      {todo.title}
                    </h3>

                    {todo.description && <p>{todo.description}</p>}

                    <span className="deadline">
                      ◷ {formatDeadline(todo.deadline)}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      type="button"
                      onClick={() => handleEdit(todo)}
                      aria-label="Edit tugas"
                      title="Edit tugas"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                      aria-label="Hapus tugas"
                      title="Hapus tugas"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Made for learning & productivity.</p>
        <span>
          React · TypeScript · Vite · {APP_VERSION}
        </span>
      </footer>
    </main>
  );
}

export default App;