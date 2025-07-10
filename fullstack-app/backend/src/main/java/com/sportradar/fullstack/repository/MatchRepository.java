package com.sportradar.fullstack.repository;

import com.sportradar.fullstack.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByHomeTeamContainingIgnoreCaseOrAwayTeamContainingIgnoreCase(String homeTeam, String awayTeam);
    List<Match> findAllByOrderByMatchDateDesc();
}