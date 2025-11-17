package com.eventara.analytics.service;
import com.eventara.common.repository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class MetricsService {
    private static final Logger logger = LoggerFactory.getLogger(MetricsService.class);

    @Autowired
    private EventRepository eventRepository;

    private final AtomicLong totalEvents = new AtomicLong(0);
    private final Map<String, AtomicLong> eventsByType = new ConcurrentHashMap<>();
    private final Map<String, AtomicLong> eventsBySource = new ConcurrentHashMap<>();

    // Tracking event timestamps for time windows
    private final Queue<Long> eventTimestamps = new LinkedList<>();

    // For throughput calculation
    private long lastMetricsTimestamp = System.currentTimeMillis();
    private long lastEventCount = 0;



}
