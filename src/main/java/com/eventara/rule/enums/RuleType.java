package com.eventara.rule.enums;

public enum RuleType {
    THRESHOLD, // Simple threshold rules (e.g., error_rate > 5%)
    PATTERN,    // Pattern matching rules (e.g., cascading failures)
    ANOMALY,    // Anomaly detection rules
    CEP         // Complex Event Processing rules
}