package com.military.ctfdigitalfortress.helper.dto;

import com.military.ctfdigitalfortress.model.CTF_TeamStatus;
import lombok.Data;

@Data
public class SetCTFTeamStatusDto {
    private Long id;
    private CTF_TeamStatus status;

    public SetCTFTeamStatusDto(Long id, CTF_TeamStatus status) {
        this.id = id;
        this.status = status;
    }
}
