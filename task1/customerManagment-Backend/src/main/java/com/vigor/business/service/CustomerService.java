package com.vigor.business.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vigor.data.entity.Customer;
import com.vigor.data.repository.CustomerRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {

        this.customerRepository = customerRepository;
    }

    public Page<Customer> getCustomersDetailsPage(Pageable p) {
        Page<Customer> customers = this.customerRepository.findAll(p);

        return customers;
    }

    public Customer CreatOrUpdateCustomer(Customer customer) {
        Customer savedCustomer = customerRepository.save(customer);

        return savedCustomer;
    }

    public void deleteCustomer(Integer customerID) {
        customerRepository.deleteById(customerID);

    }
}
