
CREATE KEYSPACE nontonapa IF NOT EXIST nontonapa
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2};

USE nontonapa;

-- user table for Log In and Register
CREATE TABLE IF NOT EXISTS users (
    user_id uuid PRIMARY KEY,
    username text,
    password text -- hashed ofc
);
CREATE INDEX IF NOT EXISTS ON users (username); -- allow search user by username during Log In

-- User Activity Log for (Time-Series)
CREATE TABLE user_activity_log (
    user_id uuid,
    watched_at timestamp,
    tmdb_id int, -- changed movie_id to tmdb_id since ill be using tmdb API
    genre text,
    rating int,
    review text,
    is_liked boolean,
    is_rewatch boolean,
    PRIMARY KEY (user_id, watched_at)
) WITH CLUSTERING ORDER BY (watched_at DESC);

-- User Preference Profile
CREATE TABLE IF NOT EXISTS user_preference_profile (
    user_id uuid,
    feature_name text, 
    feature_weight int, -- change feature value to weight to track numeric score how likely user love the movie
    PRIMARY KEY (user_id, feature_name)
);

-- dont need this metadata since we will just fetch movie from tmdb
-- Movie Metadata (Entity Store)
-- CREATE TABLE movie_metadata (
--     movie_id uuid,
--     title text,
--     genres set<text>, 
--     duration int,
--     director text,
--     cast list<text>,
--     PRIMARY KEY (movie_id)
-- );

-- Recommendation Table
CREATE TABLE IF NOT EXISTS recommendation_table (
    user_id uuid,
    rank int,
    tmdb_id int,
    match_score double,
    PRIMARY KEY (user_id, rank)
) WITH CLUSTERING ORDER BY (rank ASC);