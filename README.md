# NontonApa

NontonApa adalah aplikasi **personalized movie recommendation system** yang membantu pengguna menemukan film berdasarkan preferensi dan histori menonton.

## Overview

NontonApa menggabungkan frontend berbasis **Next.js** dengan backend **Node.js + Express** dan database **Apache Cassandra** untuk memberikan rekomendasi film yang dipersonalisasi.

Aplikasi memanfaatkan data aktivitas pengguna, metadata film, dan sistem rekomendasi untuk menghasilkan movie suggestions yang relevan.

## Group Members

- Nirmala Sari Zahiroh (2406425653)
- Abram Adrian Wilman Simanjuntak (2406439375)
- Rana Aqila Karim (2406406194)
- Muhammad Hashif Jade (2406396786)

## Project Structure

```bash
nonton-apa/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── workers/
│   ├── dump.cql
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── diary/
│   │   ├── login/
│   │   ├── movie/[tmdb_id]/
│   │   ├── recommendations/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml
└── README.md
```

## App Flow

Alur kerja aplikasi:

1. User melakukan login atau register
2. User dapat melihat movie recommendations
3. User membuka detail film
4. Frontend mengirim request ke backend API
5. Backend mengambil data film dan preferensi user
6. Recommendation system memproses data
7. Hasil rekomendasi dikirim kembali ke frontend
8. Frontend menampilkan rekomendasi dan detail film ke user

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Apache Cassandra
- TMDB API

### Deployment / Environment
- Docker
- Docker Compose

## How It Works

### Frontend

Frontend berada pada folder:

```bash
frontend/
```

Beberapa halaman utama:

- `app/page.tsx` → Landing page
- `app/login` → Login page
- `app/register` → Register page
- `app/recommendations` → Recommendation page
- `app/movie/[tmdb_id]` → Movie detail page
- `app/diary` → User diary / activity page

Reusable UI disimpan di:

```bash
frontend/components/
```

---

### Backend

Backend berada pada folder:

```bash
backend/
```

Arsitektur backend menggunakan pola modular:

- `controllers/` → Request handling
- `routes/` → API endpoints
- `repositories/` → Database query layer
- `services/` → External services (TMDB)
- `middleware/` → Authentication middleware
- `database/` → Cassandra connection
- `workers/` → Background processing

Backend entry point:

```bash
backend/index.js
```

## Running the Project

### 1. Clone Repository

```bash
git clone <repository-url>
```

### 2. Run Backend

Masuk ke backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Jalankan server:

```bash
npm start
```

---

### 3. Run Frontend

Masuk ke frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka browser:

```bash
http://localhost:3000
```

---

### 4. Using Docker (Optional)

Jika menggunakan Docker Compose:

```bash
docker-compose up
```

Aplikasi akan menjalankan service sesuai konfigurasi pada `docker-compose.yml`.
