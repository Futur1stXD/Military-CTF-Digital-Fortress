package com.military.ctfdigitalfortress.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "teams")
@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_generator")
    @SequenceGenerator(name = "id_generator", sequenceName = "teams_seq", allocationSize = 1)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "leader")
    private Long leader;
    @Column(name = "second_person")
    private Long secondPerson;
    @Column(name = "third_person")
    private Long thirdPerson;
    @Column(name = "success_attempts")
    private Integer success_attempts;
    @Column(name = "attempts")
    private Integer attempts;
    @Column(name = "invite")
    private String invite;

    public Team(String title, Long leader, Long secondPerson, Long thirdPerson, Integer success_attempts, Integer attempts, String invite) {
        this.title = title;
        this.leader = leader;
        this.secondPerson = secondPerson;
        this.thirdPerson = thirdPerson;
        this.success_attempts = success_attempts;
        this.attempts = attempts;
        this.invite = invite;
    }


    public Team() {}
}
