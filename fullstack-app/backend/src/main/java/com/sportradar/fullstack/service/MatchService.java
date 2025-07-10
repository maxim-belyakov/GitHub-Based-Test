package com.sportradar.fullstack.service;

import com.sportradar.fullstack.dto.MatchDTO;
import com.sportradar.fullstack.entity.Match;
import com.sportradar.fullstack.repository.MatchRepository;
import com.sportradar.fullstack.util.InputSanitizer;
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
        return matchRepository.findAllByOrderByMatchDateDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MatchDTO getMatch(Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found with id: " + id));
        return convertToDTO(match);
    }

    public MatchDTO createMatch(MatchDTO matchDTO) {
        Match match = new Match();
        match.setHomeTeam(inputSanitizer.sanitize(matchDTO.getHomeTeam()));
        match.setAwayTeam(inputSanitizer.sanitize(matchDTO.getAwayTeam()));
        match.setHomeScore(matchDTO.getHomeScore());
        match.setAwayScore(matchDTO.getAwayScore());
        match.setMatchDate(matchDTO.getMatchDate());
        
        Match savedMatch = matchRepository.save(match);
        return convertToDTO(savedMatch);
    }

    public MatchDTO updateMatch(Long id, MatchDTO matchDTO) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found with id: " + id));
        
        match.setHomeTeam(inputSanitizer.sanitize(matchDTO.getHomeTeam()));
        match.setAwayTeam(inputSanitizer.sanitize(matchDTO.getAwayTeam()));
        match.setHomeScore(matchDTO.getHomeScore());
        match.setAwayScore(matchDTO.getAwayScore());
        match.setMatchDate(matchDTO.getMatchDate());
        
        Match updatedMatch = matchRepository.save(match);
        return convertToDTO(updatedMatch);
    }

    public void deleteMatch(Long id) {
        if (!matchRepository.existsById(id)) {
            throw new RuntimeException("Match not found with id: " + id);
        }
        matchRepository.deleteById(id);
    }

    public List<MatchDTO> searchMatches(String team) {
        String sanitizedTeam = inputSanitizer.sanitize(team);
        return matchRepository.findByHomeTeamContainingIgnoreCaseOrAwayTeamContainingIgnoreCase(sanitizedTeam, sanitizedTeam)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MatchDTO convertToDTO(Match match) {
        MatchDTO dto = new MatchDTO();
        dto.setId(match.getId());
        dto.setHomeTeam(match.getHomeTeam());
        dto.setAwayTeam(match.getAwayTeam());
        dto.setHomeScore(match.getHomeScore());
        dto.setAwayScore(match.getAwayScore());
        dto.setMatchDate(match.getMatchDate());
        dto.setCreatedAt(match.getCreatedAt());
        return dto;
    }
}