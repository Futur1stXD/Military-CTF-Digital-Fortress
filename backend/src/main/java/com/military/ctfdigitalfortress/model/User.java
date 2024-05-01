package com.military.ctfdigitalfortress.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Table(name = "users")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_generator")
    @SequenceGenerator(name = "id_generator", sequenceName = "users_seq", allocationSize = 1)
    private Long id;
    @Column(name = "email")
    private String email;
    @Column(name = "first_name")
    private String first_name;
    @Column(name = "last_name")
    private String last_name;
    @Column(name = "password")
    private String password;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "phone_number")
    private String phone_number;
    @Column(name = "telegram_nick")
    private String telegram_nick;
    @JoinColumn(name = "team_id", nullable = true)
    private Long teamId;
    @Column(name = "success_attempts")
    private Integer success_attempts;
    @Column(name = "attempts")
    private Integer attempts;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "role")
    private Role role;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "status")
    private Status status;

    public User(String email, String first_name, String last_name, String password, String nickname, String phone_number, String telegram_nick, Integer success_attempts, Integer attempts, Role role, Status status) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.nickname = nickname;
        this.phone_number = phone_number;
        this.telegram_nick = telegram_nick;
        this.success_attempts = success_attempts;
        this.attempts = attempts;
        this.role = role;
        this.status = status;
    }

    public User() {}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return status != Status.BANNED;
    }

    @Override
    public boolean isAccountNonLocked() {
        return status != Status.BANNED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return status != Status.BANNED;
    }

    @Override
    public boolean isEnabled() {
        return status != Status.BANNED;
    }
}