package com.eventara.rule.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "rule_execution_log")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Convert(attributeName = "jsonb", converter = JsonBinaryType.class)
public class RuleExecutionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rule_id", nullable = false)
    private Long ruleId;

    @Column(name = "executed_at", nullable = false)
    private LocalDateTime executedAt;

    @Column(name = "execution_time_ms", nullable = false)
    private Integer executionTimeMs;

    @Column(name = "condition_met", nullable = false)
    private Boolean conditionMet;

    @Column(name = "threshold_value")
    private Double thresholdValue;

    @Column(name = "actual_value")
    private Double actualValue;

    @Type(JsonBinaryType.class)
    @Column(name = "evaluation_result", columnDefinition = "jsonb")
    private Map<String, Object> evaluationResult;
    private String errorMessage;

    @Column(name = "facts_inserted")
    private Integer factsInserted;
    @Column(name = "rules_fired")
    private Integer rulesFired;
    @Column(name = "session_id")
    private String sessionId;
}
