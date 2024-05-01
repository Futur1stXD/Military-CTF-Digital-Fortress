package com.military.ctfdigitalfortress.repository;

import com.military.ctfdigitalfortress.model.CTFTeams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CTFRepository extends JpaRepository<CTFTeams, Long> {
    Optional<CTFTeams> findCTFTeamsById(Long id);
    Optional<CTFTeams> findCTFTeamsByTeamid(Long id);
}
