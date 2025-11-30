package com.eventara.alert.entity;

import com.eventara.alert.enums.AlertSeverity;
import com.eventara.alert.enums.AlertStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import jakarta.persistence.*;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "alert_history")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Convert(attributeName = "jsonb", converter = JsonBinaryType.class)
public class AlertHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to alert_rules
    @Column(name = "rule_id", nullable = false)
    private Long ruleId;
    @Column(name = "rule_name", nullable = false)
    private String ruleName;
    @Column(name = "rule_version", nullable = false)
    private Integer ruleVersion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertSeverity severity;

    @Column(nullable = false)
    private Integer priority;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "threshold_value", nullable = false)
    private Double thresholdValue;

    @Column(name = "actual_value", nullable = false)
    private Double actualValue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertStatus status;

    @Column(name = "triggered_at", nullable = false)
    private LocalDateTime triggeredAt;

    private LocalDateTime acknowledgedAt;
    private String acknowledgedBy;
    private String acknowledgmentNotes;

    private LocalDateTime resolvedAt;
    private String resolvedBy;
    private String resolutionNotes;

    @Column(name = "resolution_type")
    private String resolutionType;

    private LocalDateTime expiredAt;

    @Type(JsonBinaryType.class)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Map<String, Object> context;

    @Type(JsonBinaryType.class)
    @Column(name = "notifications_sent", columnDefinition = "jsonb")
    private List<Map<String, Object>> notificationsSent;

    @ElementCollection
    private List<String> tags;

    @Column(name = "evaluation_time_ms")
    private Integer evaluationTimeMs;
}
