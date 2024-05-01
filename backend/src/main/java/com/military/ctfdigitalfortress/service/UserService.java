package com.military.ctfdigitalfortress.service;

import com.military.ctfdigitalfortress.helper.dto.LoginDto;
import com.military.ctfdigitalfortress.helper.dto.RegisterDto;
import com.military.ctfdigitalfortress.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Boolean register(RegisterDto dto);
    String login(LoginDto dto);
    Boolean addTeam(Long id, Long team_id);
    void saveUser(User u);
    public Boolean getAuthStatus(String token);
    Optional<User> findUserById(Long id);
    Optional<User> findUserByEmail(String email);

    List<User> getAllUsers();

    void deleteUser(User u);
}
