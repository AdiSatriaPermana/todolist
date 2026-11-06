# 📝 TodoList — Aplikasi Manajemen Tugas Kuliah.

Aplikasi web manajemen tugas interaktif berbasis **React**, **TypeScript**, dan **Vite** yang dirancang khusus untuk membantu mahasiswa mencatat, mengorganisir, dan memantau status penyelesaian tugas kuliah dalam satu tempat secara efisien.

🚀 **Live Demo:** [https://todolist-chi-dusky.vercel.app/](https://todolist-chi-dusky.vercel.app/)

---

## ✨ Fitur Utama

- ➕ **Tambah & Edit Tugas**: Menambahkan tugas baru lengkap dengan deskripsi dan tanggal tenggat (*deadline*).
- ✅ **Manajemen Status**: Menandai tugas sebagai selesai (*completed*) atau belum selesai (*pending*).
- 🗑️ **Hapus Tugas**: Menghapus tugas yang sudah tidak diperlukan dengan konfirmasi keamanan.
- 🔍 **Filter Kategori**: Menyaring tampilan tugas berdasarkan status (*Semua*, *Belum Selesai*, dan *Selesai*).
- 📊 **Statistik Real-Time**: Menampilkan total tugas, tugas pending, dan tugas yang telah diselesaikan.
- 🌓 **Mode Gelap & Terang (Dark/Light Theme)**: Dukungan ganti tema antarmuka visual sesuai kenyamanan pengguna.
- 💾 **Penyimpanan Lokal (LocalStorage)**: Data tugas dan preferensi tema tersimpan otomatis di browser secara persisten.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Modern CSS (Custom Properties, Flexbox, CSS Grid)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Cara Menjalankan di Lokal (Development)

Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/) di komputer kamu.

```bash
# 1. Clone repository ini
git clone [https://github.com/AdiSatriaPermana/todolist.git](https://github.com/AdiSatriaPermana/todolist.git)

# 2. Masuk ke direktori proyek
cd todolist

# 3. Instal dependensi
npm install

# 4. Jalankan server pengembangan
npm run dev