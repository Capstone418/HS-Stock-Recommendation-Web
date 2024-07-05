package com.capstone.finance.Entity.Topic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicResponseEntity {
    private String summary;
    private List<String> questions;
    private List<String> answers;
}
