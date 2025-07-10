package com.sportradar.fullstack.controller;

import com.sportradar.fullstack.dto.MatchDTO;
import com.sportradar.fullstack.service.MatchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchController {
    
    @Autowired
    private MatchService matchService;

    @GetMapping
    public ResponseEntity<List<MatchDTO>> getAllMatches() {
        List<MatchDTO> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDTO> getMatch(@PathVariable Long id) {
        try {
            MatchDTO match = matchService.getMatch(id);
            return ResponseEntity.ok(match);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<MatchDTO> createMatch(@Valid @RequestBody MatchDTO matchDTO) {
        MatchDTO createdMatch = matchService.createMatch(matchDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMatch);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MatchDTO> updateMatch(@PathVariable Long id, @Valid @RequestBody MatchDTO matchDTO) {
        try {
            MatchDTO updatedMatch = matchService.updateMatch(id, matchDTO);
            return ResponseEntity.ok(updatedMatch);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        try {
            matchService.deleteMatch(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<MatchDTO>> searchMatches(@RequestParam String team) {
        List<MatchDTO> matches = matchService.searchMatches(team);
        return ResponseEntity.ok(matches);
    }
}