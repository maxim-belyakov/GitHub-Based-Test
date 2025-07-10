package com.sportradar.matchtracker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Home team is required")
    @Column(nullable = false)
    private String homeTeam;

    @NotBlank(message = "Away team is required")
    @Column(nullable = false)
    private String awayTeam;

    @NotNull(message = "Home score is required")
    @Min(value = 0, message = "Score must be non-negative")
    private Integer homeScore;

    @NotNull(message = "Away score is required")
    @Min(value = 0, message = "Score must be non-negative")
    private Integer awayScore;

    @Column(nullable = false)
    private Long startTime;

    @PrePersist
    protected void onCreate() {
        if (startTime == null) {
            startTime = System.currentTimeMillis();
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(String homeTeam) {
        this.homeTeam = homeTeam;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(String awayTeam) {
        this.awayTeam = awayTeam;
    }

    public Integer getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(Integer homeScore) {
        this.homeScore = homeScore;
    }

    public Integer getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(Integer awayScore) {
        this.awayScore = awayScore;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }
}