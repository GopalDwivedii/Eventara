package com.eventara.common.dto;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class EventMetricsDto {

    private long totalEvents;
    private Map<String, Long> eventsByType;
    private Map<String, Long> eventsBySource;

    //Throughput metrics
    private ThroughputMetrics throughput;

    //Time Window Metrics
    private TimeWindowMetrics timeWindows;

    public EventMetricsDto() {
        this.eventsByType = new ConcurrentHashMap<>();
        this.eventsBySource = new ConcurrentHashMap<>();
        this.throughput = new ThroughputMetrics();
        this.timeWindows = new TimeWindowMetrics();
    }

    // Getters and Setters
    public long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(long totalEvents) { this.totalEvents = totalEvents; }

    public Map<String, Long> getEventsByType() { return eventsByType; }
    public void setEventsByType(Map<String, Long> eventsByType) {
        this.eventsByType = eventsByType;
    }

    public Map<String, Long> getEventsBySource() { return eventsBySource; }
    public void setEventsBySource(Map<String, Long> eventsBySource) {
        this.eventsBySource = eventsBySource;
    }

    public ThroughputMetrics getThroughput() { return throughput; }
    public void setThroughput(ThroughputMetrics throughput) {
        this.throughput = throughput;
    }

    public TimeWindowMetrics getTimeWindows() { return timeWindows; }
    public void setTimeWindows(TimeWindowMetrics timeWindows) {
        this.timeWindows = timeWindows;
    }


    // Nested classes
    public static class ThroughputMetrics {
        private double perSecond;
        private double perMinute;
        private double perHour;
        private double perDay;

        // Getters and Setters
        public double getPerSecond() { return perSecond; }
        public void setPerSecond(double perSecond) { this.perSecond = perSecond; }

        public double getPerMinute() { return perMinute; }
        public void setPerMinute(double perMinute) { this.perMinute = perMinute; }

        public double getPerHour() { return perHour; }
        public void setPerHour(double perHour) { this.perHour = perHour; }

        public double getPerDay() { return perDay; }
        public void setPerDay(double perDay) { this.perDay = perDay; }
    }

    public static class TimeWindowMetrics {
        private long last1Minute;
        private long last5Minutes;
        private long last15Minutes;
        private long last1Hour;
        private long last24Hours;

        // Getters and Setters
        public long getLast1Minute() { return last1Minute; }
        public void setLast1Minute(long last1Minute) { this.last1Minute = last1Minute; }

        public long getLast5Minutes() { return last5Minutes; }
        public void setLast5Minutes(long last5Minutes) { this.last5Minutes = last5Minutes; }

        public long getLast15Minutes() { return last15Minutes; }
        public void setLast15Minutes(long last15Minutes) { this.last15Minutes = last15Minutes; }

        public long getLast1Hour() { return last1Hour; }
        public void setLast1Hour(long last1Hour) { this.last1Hour = last1Hour; }

        public long getLast24Hours() { return last24Hours; }
        public void setLast24Hours(long last24Hours) { this.last24Hours = last24Hours; }
    }

}
