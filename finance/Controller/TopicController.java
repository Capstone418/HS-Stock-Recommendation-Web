package com.capstone.finance.Controller;

import com.capstone.finance.Entity.Topic.TopicRequestEntity;
import com.capstone.finance.Entity.Topic.TopicResponseEntity;
import com.capstone.finance.Service.Topic.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin
public class TopicController {
    private final TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService=topicService;
    }

    @PostMapping(value="api/news-topic")
    public TopicResponseEntity getTopicResponse(@RequestBody TopicRequestEntity dto) {
        String title = dto.getTitle();
        System.out.println("title: "+title);
        return topicService.getTopic(title);
    }
}
