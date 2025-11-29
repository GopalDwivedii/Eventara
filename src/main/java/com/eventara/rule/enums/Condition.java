package com.eventara.rule.enums;

public enum Condition {
    GREATER_THAN(">"),
    LESS_THAN("<"),
    EQUALS("=="),
    GREATER_THAN_OR_EQUAL(">="),
    LESS_THAN_OR_EQUAL("<="),
    NOT_EQUALS("!="),
    BETWEEN("between"),
    NOT_BETWEEN("not between");

    private final String operator;

    Condition(String operator){
        this.operator = operator;
    }

    public String getOperator(){
        return operator;
    }

}
