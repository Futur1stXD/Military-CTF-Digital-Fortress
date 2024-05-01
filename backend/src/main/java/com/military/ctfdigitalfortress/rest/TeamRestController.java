package com.military.ctfdigitalfortress.rest;

import com.military.ctfdigitalfortress.helper.dto.*;
import com.military.ctfdigitalfortress.model.CTFTeams;
import com.military.ctfdigitalfortress.model.Team;
import com.military.ctfdigitalfortress.model.User;
import com.military.ctfdigitalfortress.service.TeamService;
import com.military.ctfdigitalfortress.service.UserService;
import com.military.ctfdigitalfortress.service.impl.CTF_ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/team")
public class TeamRestController {
    @Autowired
    private TeamService teamService;
    @Autowired
    private UserService userService;
    @Autowired
    private CTF_ServiceImpl ctfService;

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecretKey;

    @PostMapping("/create")
    public ResponseEntity<Object> createTeam(@RequestBody TeamDto dto) {
        try {
            if (containsSQLInjection(dto.getTitle())) {
                return ResponseEntity.badRequest().body("Potential SQL injection detected in team title!");
            }

            if (!isValidTitle(dto.getTitle())) {
                return ResponseEntity.badRequest().body("Invalid team title!");
            }

            Optional<Team> check = teamService.findTeamByTitle(dto.getTitle());
            if (check.isPresent()) {
                return ResponseEntity.badRequest().body("Team with this title was created!");
            }
            if (teamService.create(dto)) {
                return ResponseEntity.ok().body("Success");
            }
            return ResponseEntity.badRequest().body("Error while creating the team");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    private boolean isValidTitle(String title) {
        String titleRegex = "^[a-zA-Z0-9]{2,30}$";
        return title.matches(titleRegex);
    }

    private boolean containsSQLInjection(String str) {
        String sqlInjectionPattern = ".*[;'\"]+.*";
        return str.matches(sqlInjectionPattern);
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    @PostMapping("/addMember")
    public ResponseEntity<Object> addMember(@RequestBody InviteDto dto) {
        try {
            if (containsSQLInjection(dto.getInvite())) {
                return ResponseEntity.badRequest().body("Potential SQL injection detected in email!");
            }

            var team = teamService.findTeamByInvite(dto.getInvite());
            if (team.isEmpty()) {
                return ResponseEntity.badRequest().body("Ошибка: Хеш не действителен");
            }

            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            var user = userService.findUserByEmail(email);

            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("Ошибка: Вы не авторизованы, либо ошибка в токене");
            }

            if (user.get().getTeamId() != null) {
                return ResponseEntity.badRequest().body("Ошибка: Вы уже состоите в команде");
            }

            if (team.get().getSecondPerson() != null && team.get().getThirdPerson() != null) {
                return ResponseEntity.badRequest().body("Ошибка: Команда переполнена");
            }

            if (team.get().getSecondPerson() == null && team.get().getThirdPerson() == null) {
                team.get().setSecondPerson(user.get().getId());
                user.get().setTeamId(team.get().getId());
                teamService.save(team.get());
                userService.saveUser(user.get());
                return ResponseEntity.ok().body("Вы успешно вступили в команду");
            }

            if (team.get().getSecondPerson() == null && team.get().getThirdPerson() != null) {
                team.get().setSecondPerson(user.get().getId());
                user.get().setTeamId(team.get().getId());
                teamService.save(team.get());
                userService.saveUser(user.get());
                return ResponseEntity.ok().body("Вы успешно вступили в команду");
            }

            if (team.get().getSecondPerson() != null && team.get().getThirdPerson() == null) {
                team.get().setThirdPerson(user.get().getId());
                user.get().setTeamId(team.get().getId());
                teamService.save(team.get());
                userService.saveUser(user.get());
                return ResponseEntity.ok().body("Вы успешно вступили в команду");
            }

            return ResponseEntity.badRequest().body("Ошибка при добавлении пользователя в команду");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/getTeam")
    public ResponseEntity<Object> getTeam() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            Optional<User> user = userService.findUserByEmail(email);
            if (user.isPresent()) {
                if (user.get().getTeamId() == null) {
                    return ResponseEntity.ok().body("Создайте команду!");
                }

                var team = teamService.findTeamById(user.get().getTeamId());

                if (team.isEmpty()) {
                    return ResponseEntity.badRequest().body("Ошибка: Команды не существует.");
                }

                var fUser = userService.findUserById(team.get().getLeader()).orElse(null);
                var sUser = userService.findUserById(team.get().getSecondPerson()).orElse(null);
                var tUser = userService.findUserById(team.get().getThirdPerson()).orElse(null);

                List<String> membersList = new ArrayList<>();

                if (fUser != null) {
                    membersList.add(fUser.getEmail());
                }

                if (sUser != null) {
                    membersList.add(sUser.getEmail());
                }

                if (tUser != null) {
                    membersList.add(tUser.getEmail());
                }

                return ResponseEntity.ok().body(Map.of(
                        "title", team.get().getTitle(),
                        "members", membersList,
                        "success_attempts", team.get().getSuccess_attempts(),
                        "attempts", team.get().getAttempts(),
                        "invite", team.get().getInvite()
                ));
            }
            return ResponseEntity.badRequest().body("Error getting team");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @DeleteMapping("/deleteMember")
    public ResponseEntity<Object> deleteMember(@RequestBody TeamMemberDto dto) {
        try {
            if (!isValidEmail(dto.getEmail())) {
                return ResponseEntity.badRequest().body("Invalid email!");
            }

            if (containsSQLInjection(dto.getEmail())) {
                return ResponseEntity.badRequest().body("Potential SQL injection detected in email!");
            }

            var check = userService.findUserByEmail(dto.getEmail());
            if (check.isEmpty()) {
                return ResponseEntity.badRequest().body("Не найден юзер!");
            }
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            Optional<User> user = userService.findUserByEmail(email);
            if (user.isPresent()) {
                var team = teamService.findTeamById(user.get().getTeamId());
                if (team.isPresent()) {
                    var ctf_team1 = ctfService.getTeamByTeamid(team.get().getId());
                    if (ctf_team1.isPresent()) {
                        return ResponseEntity.badRequest().body("Вы не можете удалить участника с команды. Так как вы подали заявку на участие в CTF");
                    }
                    if (team.get().getLeader().equals(user.get().getId())) {
                        if (team.get().getSecondPerson() != null && team.get().getSecondPerson().equals(check.get().getId())) {
                            team.get().setSecondPerson(null);
                            check.get().setTeamId(null);
                            teamService.save(team.get());
                            userService.saveUser(check.get());
                            return ResponseEntity.ok().body("Success deleted!");
                        }
                        if (team.get().getThirdPerson() != null && team.get().getThirdPerson().equals(check.get().getId())) {
                            team.get().setThirdPerson(null);
                            check.get().setTeamId(null);
                            teamService.save(team.get());
                            userService.saveUser(check.get());
                            return ResponseEntity.ok().body("Success deleted!");
                        }
                        return ResponseEntity.badRequest().body("Такой юзер не состоит в вашей команде, либо вы не моежете удалить себя.");
                    }
                    return ResponseEntity.badRequest().body("Вы не лидер.");
                }
                return ResponseEntity.badRequest().body("Не найдена команда!");
            }
            return ResponseEntity.badRequest().body("Не найден юзер!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/leave")
    public ResponseEntity<Object> leaveTeam() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            var user = userService.findUserByEmail(email);
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("Вы не авторизованы, либо ошибка на сервере");
            }

            var team = teamService.findTeamById(user.get().getTeamId());

            if (team.isEmpty()) {
                return ResponseEntity.badRequest().body("Команды не существует");
            }

            var userId = user.get().getId();

            if (team.get().getLeader().equals(userId)) {
                return ResponseEntity.badRequest().body("Лидер не может покинуть команду.");
            }
            var ctf_team1 = ctfService.getTeamByTeamid(team.get().getId());
            if (ctf_team1.isPresent()) {
                return ResponseEntity.badRequest().body("Вы не можете выйти с команды. Так как вы подали заявку на участие в CTF");
            }

            if (team.get().getSecondPerson().equals(userId)) {
                team.get().setSecondPerson(null);
                user.get().setTeamId(null);
                userService.saveUser(user.get());
                teamService.save(team.get());
                return ResponseEntity.ok().body("Вы успешно покинули команду.");
            }

            if (team.get().getThirdPerson().equals(userId)) {
                team.get().setThirdPerson(null);
                user.get().setTeamId(null);
                userService.saveUser(user.get());
                teamService.save(team.get());
                return ResponseEntity.ok().body("Вы успешно покинули команду.");
            }

            return ResponseEntity.badRequest().body("Пользователь не состоит в какой либо команде.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @DeleteMapping("/deleteTeam")
    public ResponseEntity<Object> deleteTeam() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            Optional<User> user = userService.findUserByEmail(email);
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("Вы не авторизованы");
            }

            var team = teamService.findTeamById(user.get().getTeamId());
            if (team.isEmpty()) {
                return ResponseEntity.badRequest().body("У вас нет команды");
            }

            var ctf_team1 = ctfService.getTeamByTeamid(team.get().getId());
            if (ctf_team1.isPresent()) {
                return ResponseEntity.badRequest().body("Вы не можете удалить команду. Так как вы подали заявку на участие в CTF");
            }

            if (!team.get().getLeader().equals(user.get().getId())) {
                return ResponseEntity.badRequest().body("Вы не лидер, вы не можете удалить команду");
            }

            if (team.get().getSecondPerson() != null) {
                var fUser = userService.findUserById(team.get().getSecondPerson());
                if (fUser.isEmpty()) {
                    return ResponseEntity.badRequest().body("Ошибка в удалении команды, обртатитесь к админам");
                }
                fUser.get().setTeamId(null);
                userService.saveUser(fUser.get());
            }

            if (team.get().getThirdPerson() != null) {
                var tUser = userService.findUserById(team.get().getThirdPerson());
                if (tUser.isEmpty()) {
                    return ResponseEntity.badRequest().body("Ошибка в удалении команды, обртатитесь к админам");
                }
                tUser.get().setTeamId(null);
                userService.saveUser(tUser.get());
            }
            var ctf_team = ctfService.getTeamByTeamid(team.get().getId());
            ctf_team.ifPresent(ctfTeams -> ctfService.deleteTeam(ctfTeams));
            user.get().setTeamId(null);
            userService.saveUser(user.get());
            teamService.delete(team.get());
            return ResponseEntity.ok().body("Вы успешно удалили команду");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/join_ctf")
    public ResponseEntity<Object> joinCTF(@RequestBody JoinCTFDto dto) throws IOException, InterruptedException {
        try {
            return ResponseEntity.badRequest().body("Регистрация закрыта");
            // if (!validateRecaptcha(dto.getRecaptchaToken())) {
            //     return ResponseEntity.badRequest().body("reCAPTCHA verification failed!");
            // }

            // if (dto.getDescription() == null) {
            //     return ResponseEntity.badRequest().body("Дескрипшн не должен быть пустым.");
            // }

            // if (containsSQLInjection(dto.getDescription())) {
            //     return ResponseEntity.badRequest().body("Potential SQL injection detected in email!");
            // }

            // String email = SecurityContextHolder.getContext().getAuthentication().getName();
            // var user = userService.findUserByEmail(email);
            // if (user.isEmpty()) {
            //     return ResponseEntity.badRequest().body("Вы не авторизованы, либо ошибка на сервере");
            // }

            // var team = teamService.findTeamById(user.get().getTeamId());
            // if (team.isEmpty()) {
            //     return ResponseEntity.badRequest().body("У вас нет команды");
            // }
            // if (team.get().getSecondPerson() == null || team.get().getThirdPerson() == null) {
            //     return ResponseEntity.badRequest().body("В команде должно быть 3 участника.");
            // }

            // if (team.get().getLeader().equals(user.get().getId())) {
            //     if (ctfService.join(team.get().getId(), dto)) {
            //         return ResponseEntity.ok().body("Вы успешно подали заявку.");
            //     } else {
            //         return ResponseEntity.badRequest().body("Вы уже ранее подавали заявку");
            //     }
            // } else {
            //     return ResponseEntity.badRequest().body("Только лидер может подавать заявку");
            // }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/getCTFTeams")
    public ResponseEntity<Object> getCTFTeams() {
        try {
            List<CTFTeams> teams = ctfService.getAllTeams();
            List<CTFFilteredDto> filteredTeams = teams.stream().map(team -> {
                Optional<Team> optionalTeam = teamService.findTeamById(team.getTeamid());
                if (optionalTeam.isPresent()) {
                    String title = optionalTeam.get().getTitle();
                    return new CTFFilteredDto(title, team.getStatus());
                } else {
                    return new CTFFilteredDto("error while get team", team.getStatus());
                }
            }).toList();
            return ResponseEntity.ok().body(Map.of("teams", filteredTeams));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/getCTF_Team_isJoined")
    public ResponseEntity<Object> getIsTeamJoined() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            var user = userService.findUserByEmail(email);
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("Вы не авторизованы, либо ошибка на сервере");
            }
            var ctf_team = ctfService.getTeamByTeamid(user.get().getTeamId());
            if (ctf_team.isEmpty()) {
                return ResponseEntity.ok().body(Map.of("joined", false));
            } else {
                return ResponseEntity.ok().body(Map.of("joined", true));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @DeleteMapping("/unJoin_CTF_team")
    public ResponseEntity<Object> unJoinCTFTeam(@RequestBody CaptchaDto dto) throws IOException, InterruptedException {
        try {
            return ResponseEntity.badRequest().body("Регистрация закрыта");
            // if (!validateRecaptcha(dto.getRecaptchaToken())) {
            //     return ResponseEntity.badRequest().body("reCAPTCHA verification failed!");
            // }

            // String email = SecurityContextHolder.getContext().getAuthentication().getName();
            // var user = userService.findUserByEmail(email);
            // if (user.isEmpty()) {
            //     return ResponseEntity.badRequest().body("Вы не авторизованы, либо ошибка на сервере");
            // }
            // var ctf_team = ctfService.getTeamByTeamid(user.get().getTeamId());
            // if (ctf_team.isEmpty()) {
            //     return ResponseEntity.badRequest().body("Вашей команды нету на участии в CTF");
            // } else {
            //     ctfService.deleteTeam(ctf_team.get());
            //     return ResponseEntity.ok().body("Вы успешно отозвали ваше участие.");
            // }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    private boolean validateRecaptcha(String recaptchaToken) throws IOException, InterruptedException {
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://www.google.com/recaptcha/api/siteverify"))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString("secret=" + recaptchaSecretKey + "&response=" + recaptchaToken))
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            boolean isRecaptchaValid = response.body().contains("\"success\": true");

            return isRecaptchaValid;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
