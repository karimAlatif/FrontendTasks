package com.vigor.data.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vigor.data.entity.Customer;


@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer> {
      
        Page<Customer> findAll(Pageable pageable);

}
