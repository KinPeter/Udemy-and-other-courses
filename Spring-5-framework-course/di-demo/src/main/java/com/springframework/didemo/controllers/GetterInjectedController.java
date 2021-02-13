package com.springframework.didemo.controllers;

import com.springframework.didemo.services.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;

@Controller
public class GetterInjectedController {

    private GreetingService greetingService;

    public String sayHello() {
        return greetingService.sayGreeting();
    }

    @Autowired
    @Qualifier("getterGreetingService") // tells exactly which bean (implementation) we want to inject if there are more implementations
    public void setGreetingService(GreetingService greetingService) {
        this.greetingService = greetingService;
    }
}
