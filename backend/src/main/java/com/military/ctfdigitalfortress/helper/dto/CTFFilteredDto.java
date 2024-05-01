package com.military.ctfdigitalfortress.helper.dto;

import com.military.ctfdigitalfortress.model.CTF_TeamStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CTFFilteredDto {
    private String title;
    private CTF_TeamStatus status;

    public CTFFilteredDto(String title, CTF_TeamStatus status) {
        this.title = title;
        this.status = status;
    }
}
