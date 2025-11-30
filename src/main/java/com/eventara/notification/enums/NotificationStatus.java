package com.eventara.notification.enums;

public enum NotificationStatus {
    PENDING,    // Notification queued
    SENT,       // Successfully sent
    FAILED,     // Failed to send
    RETRYING    // Retrying after failure
}
