package com.military.ctfdigitalfortress.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "ctf_teams")
@Entity
public class CTFTeams {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_generator")
    @SequenceGenerator(name = "id_generator", sequenceName = "ctf_teams_seq", allocationSize = 1)
    private Long id;

    @Column(name = "team_id")
    private Long teamid;
    @Column(name = "description")
    private String description;
    @Column(name = "STATUS")
    @Enumerated(value = EnumType.STRING)
    private CTF_TeamStatus status;

    public CTFTeams(Long teamid, String description, CTF_TeamStatus status) {
        this.teamid = teamid;
        this.description = description;
        this.status = status;
    }

    public CTFTeams() {}
}
