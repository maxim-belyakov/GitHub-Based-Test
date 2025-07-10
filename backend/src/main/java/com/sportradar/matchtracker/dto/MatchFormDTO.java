package com.sportradar.matchtracker.dto;

import jakarta.validation.constraints.NotBlank;

public class MatchFormDTO {
    @NotBlank(message = "Home team is required")
    private String homeTeam;

    @NotBlank(message = "Away team is required")
    private String awayTeam;

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
}