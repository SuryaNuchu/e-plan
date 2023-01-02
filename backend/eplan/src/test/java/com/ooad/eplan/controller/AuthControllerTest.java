package com.ooad.eplan.controller;

import com.ooad.eplan.controllers.AuthController;
import com.ooad.eplan.models.Skill;
import com.ooad.eplan.repositories.TeamRepository;
import com.ooad.eplan.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import com.ooad.eplan.services.IUserService;
import com.ooad.eplan.enums.Role;
import com.ooad.eplan.models.User;
import com.ooad.eplan.models.auth.AuthenticationRequest;
import com.ooad.eplan.models.auth.AuthenticationResponse;
import com.ooad.eplan.services.IUserService;
import com.ooad.eplan.util.Utils;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class AuthControllerTest {
    @InjectMocks
    IUserService userService;

    @Mock
    UserRepository userRepository;

    @Test
    public void signupTest(){
        String username="foo";
        String password="bar";
        String email="foo@bar.com";
        User user = User.builder().name(username).password(password).email(email).skills(List.of(new Skill("Java"))).role(Role.STAFF).id("123131313").orgId("12").build();
        AuthenticationRequest auth = new AuthenticationRequest();
        auth.setEmail(email);
        auth.setName(username);
        auth.setPassword(password);

    }

}
