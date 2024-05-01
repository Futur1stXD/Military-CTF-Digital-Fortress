package com.military.ctfdigitalfortress.helper.dto;

import lombok.Data;

@Data
public class AdminDto {
    private Long id;

    public AdminDto(Long id) {
        this.id = id;
    }
}
