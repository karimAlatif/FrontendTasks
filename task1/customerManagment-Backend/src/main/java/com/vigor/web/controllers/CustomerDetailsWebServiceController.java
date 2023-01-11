package com.vigor.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.vigor.business.service.CustomerService;
import com.vigor.data.entity.Customer;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/customers")
public class CustomerDetailsWebServiceController {
    private CustomerService customerService;

    @Autowired
    public CustomerDetailsWebServiceController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @CrossOrigin("*")
    @GetMapping
    public Page<Customer> getCustomers(Pageable p) {
        Page<Customer> customerList;

        customerList = this.customerService.getCustomersDetailsPage(p);

        return customerList;

    }

    @CrossOrigin("*")
    @PostMapping
    public Customer CreateOrUpdateCustomers(@RequestBody Customer customer) {
        Customer Savedcustomer;

        Savedcustomer = this.customerService.CreatOrUpdateCustomer(customer);

        return Savedcustomer;

    }

    @CrossOrigin("*")
    @DeleteMapping
    public void deleteCustomer(@RequestParam Integer customerID) {

        this.customerService.deleteCustomer(customerID);

    }

    /**
     * @param model
     */

}
