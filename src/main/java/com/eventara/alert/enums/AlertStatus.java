package com.eventara.alert.enums;

public enum AlertStatus {
    ACTIVE,          // Alert is active and needs attention
    ACKNOWLEDGED,    // Alert has been acknowledged but not resolved
    RESOLVED,        // Alert has been manually resolved
    SUPPRESSED,      // Alert was suppressed (duplicate)
    EXPIRED,         // Alert expired without resolution
    AUTO_RESOLVED    // Alert was automatically resolved
}