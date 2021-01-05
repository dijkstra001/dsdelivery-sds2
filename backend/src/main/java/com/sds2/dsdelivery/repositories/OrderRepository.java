package com.sds2.dsdelivery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sds2.dsdelivery.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	
}

