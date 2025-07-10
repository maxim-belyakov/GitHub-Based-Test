package com.sportradar.matchtracker.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

public class ScoreUpdateDTO {
    @NotNull(message = "Match ID is required")
    private String matchId;

    @NotNull(message = "Home score is required")
    @Min(value = 0, message = "Score must be non-negative")
    private Integer homeScore;

    @NotNull(message = "Away score is required")
    @Min(value = 0, message = "Score must be non-negative")
    private Integer awayScore;

    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
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
}