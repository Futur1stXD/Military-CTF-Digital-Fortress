package com.military.ctfdigitalfortress.helper.dto;

import com.military.ctfdigitalfortress.model.Role;
import lombok.Data;

@Data
public class MakeAdminDto {
    private Long id;
    private Role role;

    public MakeAdminDto(Long id, Role role) {
        this.id = id;
        this.role = role;
    }
}
