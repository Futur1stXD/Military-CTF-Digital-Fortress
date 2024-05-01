package com.military.ctfdigitalfortress.repository;

import com.military.ctfdigitalfortress.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findTeamById(Long id);
    Optional<Team> findTeamByTitle(String title);
    Optional<Team> findTeamByInvite(String invite);
}
