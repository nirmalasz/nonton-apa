
CREATE KEYSPACE nontonapa 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2};

USE nontonapa;

-- User Activity Log for (Time-Series)
CREATE TABLE user_activity_log (
    user_id uuid,
    watched_at timestamp,
    movie_id uuid,
    rating int,
    PRIMARY KEY (user_id, watched_at)
) WITH CLUSTERING ORDER BY (watched_at DESC);

-- User Preference Profile
CREATE TABLE user_preference_profile (
    user_id uuid,
    feature_name text, 
    feature_value text,
    PRIMARY KEY (user_id, feature_name)
);

-- Movie Metadata (Entity Store)
CREATE TABLE movie_metadata (
    movie_id uuid,
    title text,
    genres set<text>, 
    duration int,
    director text,
    cast list<text>,
    PRIMARY KEY (movie_id)
);

-- Recommendation Table
CREATE TABLE recommendation_table (
    user_id uuid,
    rank int,
    movie_id uuid,
    title text,
    match_score double,
    PRIMARY KEY (user_id, rank)
) WITH CLUSTERING ORDER BY (rank ASC);