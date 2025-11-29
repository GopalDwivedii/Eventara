package com.eventara.alert.enums;

public enum AlertSeverity {
    INFO(0),
    WARNING(5),
    CRITICAL(10);

    private final int priority;

    AlertSeverity(int priority) {
        this.priority = priority;
    }

    public int getPriority() {
        return priority;
    }
}
