package com.capstone.finance.Entity.PriceMenu;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="company_daily_join")
public class CompanyEntity {

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "date")
    private Date date;

    @Column(name = "company")
    private String company;

    @Column(name = "open")
    private int open;

    @Column(name = "close")
    private int close;

    @Column(name = "volume")
    private int volume;
}

