package com.capstone.finance.Entity.Chatbot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryRecordEntity implements Serializable {
    private long id;
    private String username;
    private Date date;
    private String reqMsg;
    private String resMsg;
}
