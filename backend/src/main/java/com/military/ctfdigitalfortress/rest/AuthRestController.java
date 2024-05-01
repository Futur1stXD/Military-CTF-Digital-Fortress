package com.military.ctfdigitalfortress.rest;

import com.military.ctfdigitalfortress.helper.dto.LoginDto;
import com.military.ctfdigitalfortress.helper.dto.RegisterDto;
import com.military.ctfdigitalfortress.model.User;
import com.military.ctfdigitalfortress.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecretKey;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterDto dto) throws IOException, InterruptedException {
        try {
            if (!validateRecaptcha(dto.getRecaptchaToken())) {
                return ResponseEntity.badRequest().body("reCAPTCHA verification failed!");
            }
            if (containsSQLInjection(dto)) {
                return ResponseEntity.badRequest().body("SQL Injection detected!");
            }

            if (!isValidEmail(dto.getEmail())) {
                return ResponseEntity.badRequest().body("Invalid email format!");
            }

            if (!isValidName(dto.getFirstName())) {
                return ResponseEntity.badRequest().body("Invalid first name format!");
            }
            if (!isValidName(dto.getLastName())) {
                return ResponseEntity.badRequest().body("Invalid last name format!");
            }
            if (!isValidNickname(dto.getNickname())) {
                return ResponseEntity.badRequest().body("Invalid nickname format!");
            }
            if (!isValidNickname(dto.getTelegramNick())) {
                return ResponseEntity.badRequest().body("Invalid telegram nickname format!");
            }
            if (!isValidPhoneNumber(dto.getPhoneNumber())) {
                return ResponseEntity.badRequest().body("Invalid phone number format!");
            }

            if (!isValidPassword(dto.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid password format!");
            }

            if (containsSQLInjectionDouble(dto)) {
                return ResponseEntity.badRequest().body("Potential SQL injection detected");
            }

            Optional<User> check = userService.findUserByEmail(dto.getEmail());
            if (check.isPresent()) {
                return ResponseEntity.badRequest().body("This email is already in use!");
            }
            var status = userService.register(dto);
            if (status) {
                return ResponseEntity.ok().body("Success!");
            }
            return ResponseEntity.badRequest().body("Error while registering!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    private boolean containsSQLInjection(RegisterDto dto) {
        return dto.getEmail().contains("DROP") || dto.getEmail().contains(";") ||
                dto.getFirstName().contains("DROP") || dto.getFirstName().contains(";") ||
                dto.getLastName().contains("DROP") || dto.getLastName().contains(";") ||
                dto.getNickname().contains("DROP") || dto.getNickname().contains(";") ||
                dto.getTelegramNick().contains("DROP") || dto.getTelegramNick().contains(";") ||
                dto.getPhoneNumber().contains("DROP") || dto.getPhoneNumber().contains(";");
    }

    private boolean containsSQLInjectionDouble(RegisterDto dto) {
        return containsSQLInjectionDoubleCheck(dto.getEmail()) ||
                containsSQLInjectionDoubleCheck(dto.getFirstName()) ||
                containsSQLInjectionDoubleCheck(dto.getLastName()) ||
                containsSQLInjectionDoubleCheck(dto.getNickname()) ||
                containsSQLInjectionDoubleCheck(dto.getTelegramNick()) ||
                containsSQLInjectionDoubleCheck(dto.getPhoneNumber());
    }

    private boolean containsSQLInjectionDoubleCheck(String str) {
        String sqlInjectionPattern = ".*[;'\"]+.*";
        return str.matches(sqlInjectionPattern);
    }

    private boolean isValidPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&=>#<;]{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    private boolean isValidName(String name) {
        String nameRegex = "^[a-zA-Zа-яА-Я]{2,30}$";
        Pattern pattern = Pattern.compile(nameRegex);
        Matcher matcher = pattern.matcher(name);
        return matcher.matches();
    }

    private boolean isValidPhoneNumber(String phoneNumber) {
        String phoneRegex = "^(\\+|8)[0-9]{10,14}$";
        Pattern pattern = Pattern.compile(phoneRegex);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }

    private boolean isValidNickname(String nickname) {
        String nicknameRegex = "^[a-zA-Z0-9_@]{3,20}$";
        Pattern pattern = Pattern.compile(nicknameRegex);
        Matcher matcher = pattern.matcher(nickname);
        return matcher.matches();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto dto) throws IOException, InterruptedException {
        try {
            if (!validateRecaptcha(dto.getRecaptchaToken())) {
                return ResponseEntity.badRequest().body("reCAPTCHA verification failed!");
            }
            if (containsSQLInjectionLogin(dto)) {
                return ResponseEntity.badRequest().body("SQL Injection detected!");
            }

            if (containsSQLInjectionLoginDouble(dto)) {
                return ResponseEntity.badRequest().body("Potential SQL Injection detected!");
            }

            Optional<User> check = userService.findUserByEmail(dto.getEmail());
            if (check.isEmpty()) {
                return ResponseEntity.badRequest().body("Email or password is incorrect");
            }
            if (passwordEncoder.matches(dto.getPassword(), check.get().getPassword())) {
                var jwt = userService.login(dto);
                if (!Objects.equals(jwt, "")) {
                    return ResponseEntity.ok().body(Map.of("token", jwt));
                }
            }
            return ResponseEntity.badRequest().body("Email or password is incorrect");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    private boolean containsSQLInjectionLogin(LoginDto dto) {
        return dto.getEmail().contains("DROP") || dto.getEmail().contains(";") ||
                dto.getPassword().contains("DROP") || dto.getPassword().contains(";");
    }

    private boolean containsSQLInjectionLoginDouble(LoginDto dto) {
        return containsSQLInjectionLoginDouble(dto.getEmail()) ||
                containsSQLInjectionLoginDouble(dto.getPassword());
    }

    private boolean validateRecaptcha(String recaptchaToken) throws IOException, InterruptedException {

         HttpClient httpClient = HttpClient.newHttpClient();
         HttpRequest request = HttpRequest.newBuilder()
                 .uri(URI.create("https://www.google.com/recaptcha/api/siteverify"))
                 .header("Content-Type", "application/x-www-form-urlencoded")
                 .POST(HttpRequest.BodyPublishers.ofString("secret=" + recaptchaSecretKey + "&response=" + recaptchaToken))
                 .build();
         HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
         boolean isRecaptchaValid = response.body().contains("\"success\": true");

        return isRecaptchaValid;
    }


    private boolean containsSQLInjectionLoginDouble(String str) {
        String sqlInjectionPattern = ".*[;'\"]+.*";
        return str.matches(sqlInjectionPattern);
    }
}
