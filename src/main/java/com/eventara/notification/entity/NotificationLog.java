package com.eventara.notification.entity;

import com.eventara.notification.enums.ChannelType;
import com.eventara.notification.enums.NotificationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification_log")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alert_id")
    private Long alertId; // FK to alert_history

    @Column(name = "channel_id")
    private Long channelId;

    @Enumerated(EnumType.STRING)
    @Column(name = "channel_type", nullable = false)
    private ChannelType channelType;

    @Column(nullable = false)
    private String recipient;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationStatus status;

    private LocalDateTime sentAt;

    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(name = "response_code")
    private Integer responseCode;
    @Column(name = "response_body", columnDefinition = "TEXT")
    private String responseBody;
    private String errorMessage;

    @Column(name = "retry_count")
    private Integer retryCount;
    private LocalDateTime nextRetryAt;
    @Column(name = "delivery_time_ms")
    private Integer deliveryTimeMs;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
