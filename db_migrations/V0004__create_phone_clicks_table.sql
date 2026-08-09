CREATE TABLE IF NOT EXISTS phone_clicks (
    id SERIAL PRIMARY KEY,
    page VARCHAR(500),
    place VARCHAR(50),
    device VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_phone_clicks_created ON phone_clicks (created_at DESC);