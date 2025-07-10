package com.sportradar.matchtracker.controller;

import com.sportradar.matchtracker.dto.MatchDTO;
import com.sportradar.matchtracker.dto.MatchFormDTO;
import com.sportradar.matchtracker.dto.ScoreUpdateDTO;
import com.sportradar.matchtracker.service.MatchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {
    
    @Autowired
    private MatchService matchService;

    @GetMapping
    public ResponseEntity<List<MatchDTO>> getAllMatches() {
        List<MatchDTO> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDTO> getMatch(@PathVariable String id) {
        try {
            MatchDTO match = matchService.getMatch(id);
            return ResponseEntity.ok(match);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<MatchDTO> createMatch(@Valid @RequestBody MatchFormDTO matchForm) {
        MatchDTO createdMatch = matchService.createMatch(matchForm);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMatch);
    }

    @PutMapping("/{id}/score")
    public ResponseEntity<MatchDTO> updateScore(@PathVariable String id, @Valid @RequestBody ScoreUpdateDTO scoreUpdate) {
        try {
            scoreUpdate.setMatchId(id);
            MatchDTO updatedMatch = matchService.updateScore(id, scoreUpdate);
            return ResponseEntity.ok(updatedMatch);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> finishMatch(@PathVariable String id) {
        try {
            matchService.finishMatch(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}