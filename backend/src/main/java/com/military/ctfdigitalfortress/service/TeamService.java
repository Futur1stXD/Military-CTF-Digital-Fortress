package com.military.ctfdigitalfortress.service;

import com.military.ctfdigitalfortress.helper.dto.TeamDto;
import com.military.ctfdigitalfortress.model.Team;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    Boolean create(TeamDto dto);
    Boolean addMember(String email, Long team_id);
    Optional<Team> findTeamByInvite(String invite);
    void save(Team team);
    void delete(Team team);
    Optional<Team> findTeamById(Long id);
    Optional<Team> findTeamByTitle(String title);
    List<Team> findAllTeams();
}
