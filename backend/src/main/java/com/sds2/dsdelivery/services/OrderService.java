package com.sds2.dsdelivery.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sds2.dsdelivery.dto.OrderDTO;
import com.sds2.dsdelivery.dto.ProductDTO;
import com.sds2.dsdelivery.entities.Order;
import com.sds2.dsdelivery.entities.OrderStatus;
import com.sds2.dsdelivery.entities.Product;
import com.sds2.dsdelivery.repositories.OrderRepository;
import com.sds2.dsdelivery.repositories.ProductRepository;

@Service
public class OrderService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private OrderRepository repository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll(){
		List<Order> list = repository.findOrdersWithProducts();
		
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto){
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(), 
				Instant.now(), OrderStatus.PENDING);
	
		for (ProductDTO p : dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			order.getProducts().add(product);
		}
		order = repository.save(order);
		
		return new OrderDTO(order);
	}

}
