package com.springframework.didemo.controllers;

import com.springframework.didemo.services.GreetingService;
import org.springframework.stereotype.Controller;

@Controller
public class MyController {

    private GreetingService greetingService;

    public MyController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    public String hello() {
        System.out.println("Hello!!! ");
        return this.greetingService.sayGreeting();
    }
}
