package com.bta.api.request;

public class BrandRequest {
	private Long brandId;
	private String brandName;
	private String nation;

	public BrandRequest() {

	}

	public BrandRequest(Long brandId, String brandName, String nation) {
		super();
		this.brandId = brandId;
		this.brandName = brandName;
		this.nation = nation;
	}

	public Long getBrandId() {
		return brandId;
	}

	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}
}
