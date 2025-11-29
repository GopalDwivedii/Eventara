package com.eventara.notification.entity;

import com.eventara.notification.enums.ChannelType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
//import org.hibernate.annotations.TypeDef;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "notification_channels")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Convert(attributeName = "jsonb", converter = JsonBinaryType.class)
public class NotificationChannel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "channel_type", nullable = false)
    private ChannelType channelType;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @Column(nullable = false)
    private Boolean enabled;

    @Type(JsonBinaryType.class)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Map<String, Object> config;

    @Column(name = "rate_limit_per_minute")
    private Integer rateLimitPerMinute;
    @Column(name = "rate_limit_per_hour")
    private Integer rateLimitPerHour;

    private LocalDateTime lastUsedAt;
    private Integer totalSent;
    private Integer totalFailed;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    private String createdBy;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
