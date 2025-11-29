package com.eventara.rule.enums;

public enum MetricType {
    // Error Metrics
    ERROR_RATE,
    ERROR_COUNT,

    // Performance Metrics
    AVG_LATENCY,
    P50_LATENCY,
    P95_LATENCY,
    P99_LATENCY,
    MAX_LATENCY,

    // Throughput Metrics
    EVENTS_PER_SECOND,
    EVENTS_PER_MINUTE,

    // Time Window Metrics
    EVENTS_LAST_1_MINUTE,
    EVENTS_LAST_5_MINUTES,
    EVENTS_LAST_15_MINUTES,
    EVENTS_LAST_1_HOUR,
    EVENTS_LAST_24_HOURS,

    // Source Metrics
    SOURCE_HEALTH,
    SOURCE_ERROR_RATE,
    SOURCE_LATENCY,

    // User Metrics
    ACTIVE_USERS_1_HOUR,
    ACTIVE_USERS_24_HOURS,
    TOTAL_UNIQUE_USERS,

    // System Metrics
    SYSTEM_HEALTH,
    UNIQUE_SOURCES,
    UNIQUE_EVENT_TYPES
}
