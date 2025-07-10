package com.sportradar.matchtracker.repository;

import com.sportradar.matchtracker.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, String> {
    List<Match> findAllByOrderByStartTimeDesc();
}