-- Flyway migration script for creating events table
-- Version: V1
-- Description: Create events table with indexes and JSONB columns

CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    event_id VARCHAR(50) UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    source VARCHAR(100) NOT NULL,
    user_id VARCHAR(100),
    session_id VARCHAR(100),
    severity VARCHAR(20),
    tags JSONB,
    metadata JSONB,
    received_at TIMESTAMP NOT NULL
);

-- Create indexes for optimized querying
CREATE INDEX IF NOT EXISTS idx_event_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_timestamp ON events(timestamp);
CREATE INDEX IF NOT EXISTS idx_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_source ON events(source);

-- Add check constraint for severity enum values
ALTER TABLE events
ADD CONSTRAINT check_severity
CHECK (severity IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL'));

-- Optional: Add comments for documentation
COMMENT ON TABLE events IS 'Stores event data with JSONB columns for flexible metadata and tags';
COMMENT ON COLUMN events.event_id IS 'Unique event identifier with evt_ prefix';
COMMENT ON COLUMN events.tags IS 'JSONB column for storing key-value string tags';
COMMENT ON COLUMN events.metadata IS 'JSONB column for storing flexible metadata objects';
COMMENT ON COLUMN events.received_at IS 'Timestamp when event was received by the system';