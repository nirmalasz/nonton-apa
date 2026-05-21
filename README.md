# NontonApa: Personalized Movie Recommendation System

NontonApa is a full-stack movie tracking and recommendation web application. It logs user viewing behavior, ratings, and reviews to generate highly personalized movie recommendations. The system is powered by **Apache Cassandra**, a wide-column NoSQL database chosen for its ability to handle massive, time-series user activity logs and provide high availability through node replication.

## Problem Statement

With the overwhelming number of movies available across various streaming platforms, users frequently experience "choice paralysis." Many users struggle to find films that match their specific preferences, historical tastes, or current mood.
NontonApa is built to solve this by helping users:
1. Discover films that are highly relevant to their unique tastes.
2. Receive dynamically updated, personalized recommendations based on their historical behavior (movies watched, ratings given, genres liked) and recent contextual activity.

## Target Audience

* **General Moviegoers:** Looking for quick, reliable suggestions on what to watch next.
* **Cinephiles:** Users who want detailed logging, rating, and review capabilities for their movie diary.
* **Streaming Platform Users:** Viewers who need a centralized hub to track their watch history across multiple services.

---

## Tech Stack

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" /> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" /> <img src="https://img.shields.io/badge/Apache_Cassandra-1287B1?style=for-the-badge&logo=apachecassandra&logoColor=white" alt="Apache Cassandra" /> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /> <img src="https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB" />

---

## Database Schema (Apache Cassandra)

NontonApa utilizes a highly denormalized, query-first database design optimized for lightning-fast reads and high-availability writes.

### Keyspace Configuration

```sql
CREATE KEYSPACE IF NOT EXISTS nontonapa
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2};

```

### Core Tables

**1. Users Table** (Handles Authentication)

```sql
CREATE TABLE IF NOT EXISTS users (
    user_id uuid PRIMARY KEY,
    username text,
    password text 
);
CREATE INDEX IF NOT EXISTS ON users (username);

```

**2. User Activity Log** (Time-Series Data)
Optimized for chronological retrieval using `CLUSTERING ORDER BY`.

```sql
CREATE TABLE user_activity_log (
    user_id uuid,
    watched_at timestamp,
    tmdb_id int,
    genre text,
    rating int,
    review text,
    is_liked boolean,
    is_rewatch boolean,
    PRIMARY KEY (user_id, watched_at)
) WITH CLUSTERING ORDER BY (watched_at DESC);

```

**3. User Preference Profile**
Tracks numeric scores to calculate how likely a user is to love a specific movie feature.

```sql
CREATE TABLE IF NOT EXISTS user_preference_profile (
    user_id uuid,
    feature_name text, 
    feature_weight int,
    PRIMARY KEY (user_id, feature_name)
);

```

**4. Recommendation Table**
Stores pre-computed, ranked movie suggestions.

```sql
CREATE TABLE IF NOT EXISTS recommendation_table (
    user_id uuid,
    rank int,
    tmdb_id int,
    match_score double,
    PRIMARY KEY (user_id, rank)
) WITH CLUSTERING ORDER BY (rank ASC);

```

---

## Architecture & Performance Benchmarks

As part of the database selection process, a local rapid-insert benchmark was conducted simulating **1,000 concurrent movie logs** being written to the database.

**Local Benchmark Results (1,000 records):**

* **PostgreSQL Write Duration:** `263.074ms`
* **Cassandra Write Duration:** `7.520s`

### Why we choose Cassandra over over Relational DB esp PostgreSQL

While the local micro-benchmark shows PostgreSQL performing faster for a small batch of 1,000 inserts, **Apache Cassandra was ultimately chosen as the superior architecture for NontonApa due to its behavior at a massive scale:**

1. **Driver vs. Database Overhead:** The 7.5s Cassandra duration in local testing is heavily bottlenecked by the Node.js Cassandra driver's network serialization and local connection pooling limits, rather than the database's actual disk-write speed. Postgres excels locally because it handles small connections in RAM incredibly efficiently.
2. **Horizontal Scalability:** If NontonApa scales to millions of users logging movies simultaneously, PostgreSQL will hit a vertical ceiling (requiring expensive supercomputers) and suffer from B-Tree index locking. Cassandra scales *horizontally*, we can simply add more cheap commodity servers to the ring to multiply our write throughput infinitely.
3. **High Availability & Node Replication:** Our keyspace uses a `replication_factor` of 2. In a relational database, if the primary Postgres node crashes, the app goes down. In NontonApa's masterless Cassandra ring, if Node 1 goes offline, Node 2 immediately accepts the user's movie log with **zero downtime**.
4. **O(1) Read Performance:** Thanks to our Time-Series data modeling and `CLUSTERING ORDER BY (watched_at DESC)`, loading a user's movie diary requires zero expensive `JOIN` operations or CPU-heavy `ORDER BY` sorting, making the frontend dashboard load instantly regardless of how large the database grows.
