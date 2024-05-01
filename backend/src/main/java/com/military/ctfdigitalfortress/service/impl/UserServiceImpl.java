package com.military.ctfdigitalfortress.service.impl;

import com.military.ctfdigitalfortress.helper.dto.LoginDto;
import com.military.ctfdigitalfortress.helper.dto.RegisterDto;
import com.military.ctfdigitalfortress.model.Role;
import com.military.ctfdigitalfortress.model.Status;
import com.military.ctfdigitalfortress.model.User;
import com.military.ctfdigitalfortress.repository.UserRepository;
import com.military.ctfdigitalfortress.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private JwtUserService jwtUserService;
    @Override
    public Boolean register(RegisterDto dto) {
        try {
            User newUser = new User(
                    dto.getEmail(),
                    dto.getFirstName(),
                    dto.getLastName(),
                    passwordEncoder.encode(dto.getPassword()),
                    dto.getNickname(),
                    dto.getPhoneNumber(),
                    dto.getTelegramNick(),
                    0,
                    0,
                    Role.USER,
                    Status.VERIFICATION
            );
            userRepository.save(newUser);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public String login(LoginDto dto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
            var user = userRepository.findUserByEmail(dto.getEmail()).orElseThrow();
            return jwtUtils.generateToken(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return "";
    }

    @Override
    public Boolean addTeam(Long id, Long team_id) {
        Optional<User> user = userRepository.findUserById(id);
        if (user.isPresent()) {
            user.get().setTeamId(team_id);
            userRepository.save(user.get());
            return true;
        }
        return false;
    }

    @Override
    public void saveUser(User u) {
        userRepository.save(u);
    }

    public Boolean getAuthStatus(String token) {
        UserDetails userDetails = jwtUserService.loadUserByUsername(jwtUtils.extractEmail(token));
        return jwtUtils.isTokenValid(token, userDetails);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(User u) {
        userRepository.delete(u);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findUserById(id);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
}
