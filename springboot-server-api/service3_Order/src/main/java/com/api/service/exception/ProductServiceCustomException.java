package com.api.service.exception;

public class ProductServiceCustomException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private String errorCode;

	public ProductServiceCustomException(String message, String errorCode) {
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
