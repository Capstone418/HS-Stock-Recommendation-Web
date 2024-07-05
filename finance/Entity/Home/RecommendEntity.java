package com.capstone.finance.Entity.Home;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="recommend")
@Entity
public class RecommendEntity {
    @Id
    private String code;

    @Column
    private int last_pv;
}
