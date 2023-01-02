package com.ooad.eplan.controllers;

import com.ooad.eplan.enums.Role;
import com.ooad.eplan.models.User;
import com.ooad.eplan.models.auth.AuthenticationRequest;
import com.ooad.eplan.models.auth.AuthenticationResponse;
import com.ooad.eplan.services.ILoggerService;
import com.ooad.eplan.services.IUserService;
import com.ooad.eplan.util.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping(path = "/api")
public class AuthController extends BaseController{

    @Autowired
    IUserService userService;

    @Autowired
    Utils utils;

    @Autowired
    ILoggerService loggerService;

    @PostMapping("/signup")
    private ResponseEntity<?> signupUser(@RequestBody AuthenticationRequest authenticationRequest){
        String username=authenticationRequest.getName();
        String password=authenticationRequest.getPassword();
        String email=authenticationRequest.getEmail();
        User foundedUser = userService.getUserByEmail(email);
        if(foundedUser==null) {
            User userModel = User.builder().build();
            userModel.setName(username);
            userModel.setPassword(password);
            userModel.setEmail(email);
            userModel.setRole(Role.CEO);
            userModel.setOrgId(utils.getUUID());
            User userResponse = User.builder().build();
            try {
                userResponse = userService.save(userModel);
            } catch (Exception e) {
                return ResponseEntity.ok(new AuthenticationResponse());
            }
            return ResponseEntity.ok(new AuthenticationResponse(userResponse.getName(), userResponse.getEmail(), userResponse.getRole().name(), userResponse.getOrgId(), userResponse.getId()));
        }
        else{
            return ResponseEntity.ok(new AuthenticationResponse());
        }
    }

    @PostMapping("/login")
    private ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest){
        String email=authenticationRequest.getEmail();
        String password=authenticationRequest.getPassword();

        boolean isValidUser = userService.authenticate(email,password);
        User loadedUser = User.builder().build();
        if(isValidUser) {
             loadedUser = userService.getUserByEmail(email);
             if(loadedUser!=null)
            return ResponseEntity.ok(new AuthenticationResponse(loadedUser.getName(), loadedUser.getEmail(), loadedUser.getRole().name(), loadedUser.getOrgId(), loadedUser.getId()));
             else return ResponseEntity.ok(new AuthenticationResponse());
        } else{
            return ResponseEntity.ok(new AuthenticationResponse());
        }
    }

    @PostMapping("/logout")
    private ResponseEntity<?> logoutConfirmation(@RequestBody AuthenticationRequest authenticationRequest){
        loggerService.info("Session cleared for the user: "+ authenticationRequest.getName());
        loggerService.info("User Logged out of the system: "+ authenticationRequest.getName());
        return ResponseEntity.ok(new AuthenticationResponse());
    }

}
