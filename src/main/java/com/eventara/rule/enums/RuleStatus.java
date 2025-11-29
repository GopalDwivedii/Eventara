package com.eventara.rule.enums;

public enum RuleStatus {
    ACTIVE,     // Rule is active and being evaluated
    INACTIVE,   // Rule is disabled
    DRAFT,      // Rule is being created/edited
    ARCHIVED    // Rule is archived (soft delete)
}