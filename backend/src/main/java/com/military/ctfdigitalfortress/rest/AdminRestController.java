package com.military.ctfdigitalfortress.rest;

import com.military.ctfdigitalfortress.helper.dto.AdminDto;
import com.military.ctfdigitalfortress.helper.dto.MakeAdminDto;
import com.military.ctfdigitalfortress.helper.dto.SetCTFTeamStatusDto;
import com.military.ctfdigitalfortress.model.*;
import com.military.ctfdigitalfortress.service.TeamService;
import com.military.ctfdigitalfortress.service.UserService;
import com.military.ctfdigitalfortress.service.impl.CTF_ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@RestController
@RequestMapping("/api/org/admin/")
public class AdminRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private CTF_ServiceImpl ctfService;

    @GetMapping("/getUsers")
    public ResponseEntity<Object> getUsers() {
        try {
            List<User> users = userService.getAllUsers();

            List<Map<String, Object>> filteredUsers = users.stream()
                    .map(user -> {
                        Map<String, Object> userMap = new HashMap<>();
                        userMap.put("id", user.getId());
                        userMap.put("email", user.getEmail());
                        userMap.put("first_name", user.getFirst_name());
                        userMap.put("last_name", user.getLast_name());
                        userMap.put("nickname", user.getNickname());
                        userMap.put("phone_number", user.getPhone_number());
                        userMap.put("telegram_nick", user.getTelegram_nick());
                        userMap.put("teamId", user.getTeamId());
                        userMap.put("success_attempts", user.getSuccess_attempts());
                        userMap.put("attempts", user.getAttempts());
                        userMap.put("role", user.getRole());
                        userMap.put("status", user.getStatus());
                        return userMap;
                    })
                    .toList();

            return ResponseEntity.ok().body(Map.of("users", filteredUsers));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/getTeams")
    public ResponseEntity<Object> getTeams() {
        try {
            return ResponseEntity.ok().body(Map.of("teams", teamService.findAllTeams()));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/getCTFTeams")
    public ResponseEntity<Object> getCTFTeams() {
        try {
            List<CTFTeams> ctfTeams = ctfService.getAllTeams();
            List<Object> teamsWithUsers = new ArrayList<>();
            for (CTFTeams team : ctfTeams) {
                List<String> usersInTeam = new ArrayList<>();
                var findTeam = teamService.findTeamById(team.getTeamid());
                if (findTeam.isPresent()) {
                    var leader = userService.findUserById(findTeam.get().getLeader());
                    if (leader.isPresent()) {
                        usersInTeam.add(leader.get().getNickname());
                    }
                    if (findTeam.get().getSecondPerson() != null) {
                        var second = userService.findUserById(findTeam.get().getSecondPerson());
                        usersInTeam.add(second.get().getNickname());
                    } else {
                        usersInTeam.add(null);
                    }
                    if (findTeam.get().getThirdPerson() != null) {
                        var third = userService.findUserById(findTeam.get().getThirdPerson());
                        usersInTeam.add(third.get().getNickname());
                    } else {
                        usersInTeam.add(null);
                    }
                }
                Map<String, Object> teamWithUsers = new HashMap<>();
                if (findTeam.isPresent()) {
                    teamWithUsers.put("id", team.getId());
                    teamWithUsers.put("team", findTeam.get().getTitle());
                    teamWithUsers.put("users", usersInTeam);
                    teamWithUsers.put("description", team.getDescription());
                    teamsWithUsers.add(teamWithUsers);
                }
            }

            return ResponseEntity.ok().body(Map.of("ctf_teams", teamsWithUsers));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/downloadCTFTeamsExcel")
    public ResponseEntity<byte[]> downloadCTFTeamsExcel() {
        try {
            List<CTFTeams> ctfTeams = ctfService.getAllTeams();

            // Create a new Workbook
            Workbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();

            // Create a Sheet
            Sheet sheet = workbook.createSheet("CTF Teams");

            // Create a Header Row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Название команды", "Опыт участия", "Лидер", "Почта лидера", "ФИО Лидера",
            "Номер телефона Лидера", "Телеграмм Лидера", "Никнейм 2 Участника", "ФИО 2 Участника", "Почта 2 участника",
            "Номер телефона 2 Участника", "Телеграмм 2 Участника", "Никнейм 3 Участника", "ФИО 3 Участника", "Почта 3 участника",
                    "Номер телефона 3 Участника", "Телеграмм 3 Участника"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            // Fill data rows
            int rowNum = 1;
            for (CTFTeams team : ctfTeams) {
                var findTeam = teamService.findTeamById(team.getTeamid());
                if (findTeam.isPresent()) {
                    var leader = userService.findUserById(findTeam.get().getLeader()).orElse(null);
                    var second = userService.findUserById(findTeam.get().getSecondPerson()).orElse(null);
                    var third = userService.findUserById(findTeam.get().getThirdPerson()).orElse(null);

                    Row row = sheet.createRow(rowNum++);

                    row.createCell(0).setCellValue(findTeam.get().getId());
                    row.createCell(1).setCellValue(findTeam.get().getTitle());
                    row.createCell(2).setCellValue(team.getDescription());

                    if (leader != null) {
                        row.createCell(3).setCellValue(leader.getNickname());
                        row.createCell(4).setCellValue(leader.getEmail());
                        row.createCell(5).setCellValue(leader.getFirst_name() + " " + leader.getLast_name());
                        row.createCell(6).setCellValue(leader.getPhone_number());
                        row.createCell(7).setCellValue(leader.getTelegram_nick());
                    }

                    if (second != null) {
                        row.createCell(8).setCellValue(second.getNickname());
                        row.createCell(9).setCellValue(second.getEmail());
                        row.createCell(10).setCellValue(second.getFirst_name() + " " + second.getLast_name());
                        row.createCell(11).setCellValue(second.getPhone_number());
                        row.createCell(12).setCellValue(second.getTelegram_nick());
                    }

                    if (third != null) {
                        row.createCell(13).setCellValue(third.getNickname());
                        row.createCell(14).setCellValue(third.getEmail());
                        row.createCell(15).setCellValue(third.getFirst_name() + " " + third.getLast_name());
                        row.createCell(16).setCellValue(third.getPhone_number());
                        row.createCell(17).setCellValue(third.getTelegram_nick());
                    }
                }
            }

            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Write the workbook content to a byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            workbook.close();

            byte[] data = outputStream.toByteArray();

            // Prepare response
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "ctf_teams.xlsx");

            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PostMapping("/setAdmin")
    public ResponseEntity<Object> setAdmin(@RequestBody MakeAdminDto dto) {
        try {
            var user = userService.findUserById(dto.getId());

            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("Not found user");
            }

            user.get().setRole(dto.getRole());
            userService.saveUser(user.get());
            return ResponseEntity.ok().body("Admin was set!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/setCTFTeam_status")
    public ResponseEntity<Object> setStatus(@RequestBody SetCTFTeamStatusDto dto) {
        try {
            var team = ctfService.getTeamById(dto.getId());
            if (team.isEmpty()) {
                return ResponseEntity.badRequest().body("Not found team");
            }

            team.get().setStatus(dto.getStatus());
            ctfService.save(team.get());
            return ResponseEntity.ok().body("Status set");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @DeleteMapping("/deleteTeam/{id}")
    public ResponseEntity<Object> deleteTeam(@PathVariable Long id) {
        try {
            var team = teamService.findTeamById(id);
            if (team.isEmpty()) {
                return ResponseEntity.badRequest().body("Нет такой команды");
            }
            if (team.get().getLeader() != null) {
                var user = userService.findUserById(team.get().getLeader());
                if (user.isEmpty()) {
                    return ResponseEntity.ok().body("Лидер пуст");
                }
                user.get().setTeamId(null);
                userService.saveUser(user.get());
            }
            if (team.get().getSecondPerson() != null) {
                var user = userService.findUserById(team.get().getSecondPerson());
                if (user.isEmpty()) {
                    return ResponseEntity.ok().body("Второй пуст");
                }
                user.get().setTeamId(null);
                userService.saveUser(user.get());
            }

            if (team.get().getThirdPerson() != null) {
                var user = userService.findUserById(team.get().getThirdPerson());
                if (user.isEmpty()) {
                    return ResponseEntity.ok().body("Второй пуст");
                }
                user.get().setTeamId(null);
                userService.saveUser(user.get());
            }

            teamService.delete(team.get());
            return ResponseEntity.ok().body("Удалено");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        try {
            var user = userService.findUserById(id);
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("Нет такого юзера");
            }
            userService.deleteUser(user.get());
            return ResponseEntity.ok().body("Удалено");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @DeleteMapping("/deleteCTFTeam/{id}")
    public ResponseEntity<Object> deleteCTFTeam(@PathVariable Long id) {
        try {
            var team = ctfService.getTeamById(id);
            if (team.isEmpty()) {
                return ResponseEntity.badRequest().body("Нет такой команды");
            }
            ctfService.deleteTeam(team.get());
            return ResponseEntity.ok().body("Удалено");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

}
