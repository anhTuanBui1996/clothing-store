package com.api.service.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ORDER_ID")
	private Long orderId;

	@Column(name = "USER_ID")
	private Long userId;

	@Column(name = "ORDER_DATE")
	private Date orderDate;

	@Column(name = "COMPLETED_DATE")
	private Date completedDate;

	@Column(name = "PREDICT_COMPLETED_DATE")
	private Date predictCompletedDate;

	@Column(name = "FROM_ADDRESS")
	private String fromAddress;

	@Column(name = "TO_ADDRESS")
	private String toAddress;

	@Column(name = "TOTAL_PRODUCT_PRICE")
	private long totalProductPrice;

	@Column(name = "TOTAL_SHIPMENT_PRICE")
	private long totalShipmentPrice;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderDetail> details;

	public Order() {

	}

	public Order(Long orderId, Long userId, Date orderDate, Date completedDate, Date predictCompletedDate,
			String fromAddress, String toAddress, long totalProductPrice, long totalShipmentPrice,
			List<OrderDetail> details) {
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.orderDate = orderDate;
		this.completedDate = completedDate;
		this.predictCompletedDate = predictCompletedDate;
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.totalProductPrice = totalProductPrice;
		this.totalShipmentPrice = totalShipmentPrice;
		this.details = details;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getCompletedDate() {
		return completedDate;
	}

	public void setCompletedDate(Date completedDate) {
		this.completedDate = completedDate;
	}

	public Date getPredictCompletedDate() {
		return predictCompletedDate;
	}

	public void setPredictCompletedDate(Date predictCompletedDate) {
		this.predictCompletedDate = predictCompletedDate;
	}

	public String getFromAddress() {
		return fromAddress;
	}

	public void setFromAddress(String fromAddress) {
		this.fromAddress = fromAddress;
	}

	public String getToAddress() {
		return toAddress;
	}

	public void setToAddress(String toAddress) {
		this.toAddress = toAddress;
	}

	public long getTotalProductPrice() {
		return totalProductPrice;
	}

	public void setTotalProductPrice(long totalProductPrice) {
		this.totalProductPrice = totalProductPrice;
	}

	public long getTotalShipmentPrice() {
		return totalShipmentPrice;
	}

	public void setTotalShipmentPrice(long totalShipmentPrice) {
		this.totalShipmentPrice = totalShipmentPrice;
	}

	public List<OrderDetail> getDetails() {
		return details;
	}

	public void setDetails(List<OrderDetail> details) {
		this.details = details;
	}

}
