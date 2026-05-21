# NontonApa

NontonApa adalah aplikasi *personalized movie recommendation system* yang membantu pengguna menemukan film berdasarkan preferensi dan perilaku menonton mereka.

## Deskripsi
NontonApa dibuat untuk mengatasi kesulitan pengguna dalam memilih film di tengah banyaknya pilihan yang tersedia. Sistem memberikan rekomendasi yang dipersonalisasi berdasarkan histori tontonan, rating, dan aktivitas pengguna.

## Group Members
- Nirmala Sari Zahiroh (2406425653)
- Abram Adrian Wilman Simanjuntak (2406439375)
- Rana Aqila Karim (2406406194)
- Muhammad Hashif Jade (2406396786)

## Features
- Menyimpan histori aktivitas menonton pengguna
- Menyimpan preferensi pengguna
- Menyimpan metadata film
- Memberikan rekomendasi film yang dipersonalisasi

## Data Model
### User Activity Log
Menyimpan histori tontonan pengguna.

### User Preference Profile
Menyimpan preferensi pengguna seperti genre atau film favorit.

### Movie Metadata
Menyimpan informasi film seperti judul, genre, rating, durasi, dan sutradara.

### Recommendation Table
Menyimpan hasil rekomendasi film yang telah dihitung untuk akses cepat.

## Tech Stack
- Apache Cassandra
- Wide-Column NoSQL Database

## Target Users
- Penonton film umum
- Sinefil
- Pengguna platform streaming

## Tujuan
Membantu pengguna memilih film dengan rekomendasi yang relevan berdasarkan histori dan preferensi menonton.
