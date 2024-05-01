package com.military.ctfdigitalfortress.service.impl;

import com.military.ctfdigitalfortress.helper.dto.TeamDto;
import com.military.ctfdigitalfortress.model.Team;
import com.military.ctfdigitalfortress.model.User;
import com.military.ctfdigitalfortress.repository.TeamRepository;
import com.military.ctfdigitalfortress.service.TeamService;
import com.military.ctfdigitalfortress.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserService userService;
    private static final String privateKey = "GxY9z$6LmE#w2Pv&3F$@bVj^1dK!tN*rXm#8tBhZ";

    @Override
    public Boolean create(TeamDto dto) {
        try {
            Optional<User> leader = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());

            if (leader.isEmpty()) {
                return false;
            }

            if (leader.get().getTeamId() != null) {
                return false;
            }

            String randomString = generateRandomString();
            Mac hmac =  Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(privateKey.getBytes(), "HmacSHA256");
            hmac.init(secretKeySpec);
            var randomTitled = dto.getTitle() + randomString;
            byte[] hmacBytes = hmac.doFinal(randomTitled.getBytes());

            String invite = Base64.getEncoder().encodeToString(hmacBytes);

            Team team = new Team(dto.getTitle(), leader.get().getId(), null, null, 0, 0, invite);

            teamRepository.save(team);
            userService.addTeam(leader.get().getId(), team.getId());

            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    private static String generateRandomString() {
        SecureRandom random = new SecureRandom();
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    @Override
    public Boolean addMember(String email, Long team_id) {
        Optional<User> user = userService.findUserByEmail(email);
        if (user.isPresent()) {
            if (user.get().getTeamId() != null) {
                return false;
            }
            Optional<Team> team = teamRepository.findTeamById(team_id);
            if (team.isPresent()) {
                Team teamEntity = team.get();
                Long userId = user.get().getId();

                if (teamEntity.getLeader().equals(userId) ||
                        (teamEntity.getSecondPerson() != null && teamEntity.getSecondPerson().equals(userId)) ||
                        (teamEntity.getThirdPerson() != null && teamEntity.getThirdPerson().equals(userId)) ||
                        (teamEntity.getSecondPerson() != null && teamEntity.getThirdPerson() != null)) {
                    return false;
                }

                if (teamEntity.getSecondPerson() == null) {
                    teamEntity.setSecondPerson(userId);
                } else {
                    teamEntity.setThirdPerson(userId);
                }
                user.get().setTeamId(team_id);
                userService.saveUser(user.get());
                teamRepository.save(teamEntity);
                return true;
            }
        }
        return false;
    }

    @Override
    public Optional<Team> findTeamByInvite(String invite) {
        return teamRepository.findTeamByInvite(invite);
    }

    @Override
    public void save(Team team) {
        teamRepository.save(team);
    }

    @Override
    public void delete(Team team) {
        teamRepository.delete(team);
    }

    @Override
    public Optional<Team> findTeamById(Long id) {
        return teamRepository.findTeamById(id);
    }

    @Override
    public Optional<Team> findTeamByTitle(String title) {
        return teamRepository.findTeamByTitle(title);
    }

    @Override
    public List<Team> findAllTeams() {
        return teamRepository.findAll();
    }
}
