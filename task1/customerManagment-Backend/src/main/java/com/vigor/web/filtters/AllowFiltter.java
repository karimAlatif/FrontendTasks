package com.vigor.web.filtters;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Component
public class AllowFiltter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin","*");
        response.addHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
        response.addHeader("Access-Control-Allow-Headers","*");
        System.out.println("done filtter");
        filterChain.doFilter(request, response);
    }
}
