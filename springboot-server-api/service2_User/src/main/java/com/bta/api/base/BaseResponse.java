package com.bta.api.base;

import com.bta.api.enums.ResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponse {

    private ResponseStatus status;
    private String message;
    private Date dateResponse;
    private Object dataResponse;

}
