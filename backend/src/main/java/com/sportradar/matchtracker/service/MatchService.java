package com.sportradar.matchtracker.service;

import com.sportradar.matchtracker.dto.MatchDTO;
import com.sportradar.matchtracker.dto.MatchFormDTO;
import com.sportradar.matchtracker.dto.ScoreUpdateDTO;
import com.sportradar.matchtracker.entity.Match;
import com.sportradar.matchtracker.repository.MatchRepository;
import com.sportradar.matchtracker.util.InputSanitizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MatchService {
    
    @Autowired
    private MatchRepository matchRepository;
    
    @Autowired
    private InputSanitizer inputSanitizer;

    public List<MatchDTO> getAllMatches() {
        return matchRepository.findAllByOrderByStartTimeDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MatchDTO getMatch(String id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found with id: " + id));
        return convertToDTO(match);
    }

    public MatchDTO createMatch(MatchFormDTO matchForm) {
        Match match = new Match();
        match.setHomeTeam(inputSanitizer.sanitize(matchForm.getHomeTeam()));
        match.setAwayTeam(inputSanitizer.sanitize(matchForm.getAwayTeam()));
        match.setHomeScore(0);
        match.setAwayScore(0);
        match.setStartTime(System.currentTimeMillis());
        
        Match savedMatch = matchRepository.save(match);
        return convertToDTO(savedMatch);
    }

    public MatchDTO updateScore(String id, ScoreUpdateDTO scoreUpdate) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found with id: " + id));
        
        match.setHomeScore(scoreUpdate.getHomeScore());
        match.setAwayScore(scoreUpdate.getAwayScore());
        
        Match updatedMatch = matchRepository.save(match);
        return convertToDTO(updatedMatch);
    }

    public void deleteMatch(String id) {
        if (!matchRepository.existsById(id)) {
            throw new RuntimeException("Match not found with id: " + id);
        }
        matchRepository.deleteById(id);
    }

    public void finishMatch(String id) {
        if (!matchRepository.existsById(id)) {
            throw new RuntimeException("Match not found with id: " + id);
        }
        // In a real app, we might update a status field
        // For now, we'll just delete the match
        matchRepository.deleteById(id);
    }

    private MatchDTO convertToDTO(Match match) {
        MatchDTO dto = new MatchDTO();
        dto.setId(match.getId());
        dto.setHomeTeam(match.getHomeTeam());
        dto.setAwayTeam(match.getAwayTeam());
        dto.setHomeScore(match.getHomeScore());
        dto.setAwayScore(match.getAwayScore());
        dto.setStartTime(match.getStartTime());
        return dto;
    }
}