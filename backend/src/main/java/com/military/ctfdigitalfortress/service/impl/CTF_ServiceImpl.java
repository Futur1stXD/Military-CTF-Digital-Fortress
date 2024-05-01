package com.military.ctfdigitalfortress.service.impl;

import com.military.ctfdigitalfortress.helper.dto.JoinCTFDto;
import com.military.ctfdigitalfortress.model.CTFTeams;
import com.military.ctfdigitalfortress.model.CTF_TeamStatus;
import com.military.ctfdigitalfortress.repository.CTFRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CTF_ServiceImpl {
    @Autowired
    private CTFRepository ctfRepository;

    public boolean join(Long team_id, JoinCTFDto dto) {
        var team = ctfRepository.findCTFTeamsByTeamid(team_id);
        if (team.isEmpty()) {
            CTFTeams joinedTeam = new CTFTeams(team_id, dto.getDescription(), CTF_TeamStatus.PROCESS);
            ctfRepository.save(joinedTeam);
            return true;
        }
        return false;
    }

    public void save(CTFTeams teams) {
        ctfRepository.save(teams);
    }

    public List<CTFTeams> getAllTeams() {
        return ctfRepository.findAll();
    }

    public Optional<CTFTeams> getTeamByTeamid(Long id) {
        return ctfRepository.findCTFTeamsByTeamid(id);
    }

    public Optional<CTFTeams> getTeamById(Long id) {
        return ctfRepository.findCTFTeamsById(id);
    }

    public void deleteTeam(CTFTeams team) {
        ctfRepository.delete(team);
    }
}
