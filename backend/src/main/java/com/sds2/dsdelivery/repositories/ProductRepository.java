package com.sds2.dsdelivery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sds2.dsdelivery.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
	List<Product> findAllByOrderByNameAsc();
	
	
}

