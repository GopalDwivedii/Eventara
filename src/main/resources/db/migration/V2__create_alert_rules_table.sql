-- alearts rules table
CREATE TABLE alert_rules (
    id BIGSERIAL PRIMARY KEY,

    --Basic info
    name varchar(255) NOT NULL UNIQUE,
    description TEXT,
    rule_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    -- RUle Congiguration (JSON)
    rule_config JSONB NOT NULL,

    --general DRL
    generated_drl TEXT NOT NULL,
    drl_hash VARCHAR(64),

    --Alert Settings
    severity VARCHAR(20) NOT NULL,
    priority INTEGER NOT NULL DEFAULT 0,

    --noti config
    notification_channels TEXT[],
    notification_config JSONB,

    -- Suppression & Rate Limiting
    suppression_window_minutes INTEGER DEFAULT 30,
    max_alerts_per_hour INTEGER DEFAULT 10,

    -- Metadata
    created_by VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_triggered_at TIMESTAMP,
    trigger_count INTEGER DEFAULT 0,

    -- Versioning
    version INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT chk_priority CHECK (priority >= 0 AND priority <= 10),
    CONSTRAINT chk_rule_type CHECK (rule_type IN ('THRESHOLD', 'PATTERN', 'ANOMALY', 'CEP')),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'DRAFT', 'ARCHIVED')),
    CONSTRAINT chk_severity CHECK (severity IN ('INFO', 'WARNING', 'CRITICAL'))
);

CREATE INDEX idx_alert_rules_status ON alert_rules(status);
CREATE INDEX idx_alert_rules_type ON alert_rules(rule_type);
CREATE INDEX idx_alert_rules_created_at ON alert_rules(created_at);
CREATE INDEX idx_alert_rules_config ON alert_rules USING GIN(rule_config);




