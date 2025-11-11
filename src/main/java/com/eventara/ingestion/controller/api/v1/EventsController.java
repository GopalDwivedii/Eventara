package com.eventara.ingestion.controller.api.v1;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventsController {

    @PostMapping("/api/v1/events")
    public String Events(){
        return  "Event received";
    }
}
