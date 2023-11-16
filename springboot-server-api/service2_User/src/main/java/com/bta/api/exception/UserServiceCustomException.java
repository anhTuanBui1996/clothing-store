package com.bta.api.exception;

public class UserServiceCustomException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private String errorCode;

	public UserServiceCustomException(String message, String errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

}
