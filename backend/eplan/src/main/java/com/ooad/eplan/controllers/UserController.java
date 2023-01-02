package com.ooad.eplan.controllers;

import com.ooad.eplan.models.User;
import com.ooad.eplan.services.ILoggerService;
import com.ooad.eplan.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Class - UserController
 */
@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController extends BaseController{

    /**
     * Instance - userService
     */
    @Autowired
    IUserService userService;

    @Autowired
    ILoggerService loggerService;

    /**
     * Method - getUsers
     * @return List<User>
     */
    @GetMapping(value = "/all/{orgId}")
    public List<User> getUsers(@PathVariable String orgId){
        List<User> users = userService.getUsers().stream().filter(u-> u.getOrgId().equals(orgId)).collect(Collectors.toList());
        loggerService.info("Retrieved all the users");
        return users;
    }

    /**
     * Method - getUserById
     * @return User
     */
    @GetMapping(value = "/{id}")
    public User getUserById(@PathVariable String id){
        User users = userService.getUserById(id);
        loggerService.info("Retrieved all the users");
        return users;
    }

    /**
     * Method - saveUser
     * @param user
     * @return ResponseEntity
     */
    @PostMapping(value = "/save")
    public ResponseEntity saveUser(@RequestBody User user){

        User createdUser = userService.save(user);
        loggerService.info("User created : "+createdUser.getId());
        return ResponseEntity.ok().build();
    }

    /**
     * Method - updateUser
     * @param user
     * @return ResponseEntity
     */
    @PatchMapping(value = "/update")
    public ResponseEntity updateUser(@RequestBody User user){
        User updatedUser = userService.save(user);
        loggerService.info("User updated :"+updatedUser);
        return ResponseEntity.ok().build();
    }

    /**
     * Method - deleteUser
     * @param userId
     * @return ResponseEntity
     */
    @DeleteMapping(value = "/delete/{userId}")
    public ResponseEntity deleteUser(@PathVariable String userId){
        userService.delete(userId);
        loggerService.info("Successfully Deleted");
        return ResponseEntity.ok().build();
    }

    /**
     * Method - saveUser
     * @param users
     * @return ResponseEntity
     */
    @PostMapping(value = "/saveAll")
    public ResponseEntity saveUser(@RequestBody List<User> users){
        List<User> createdUsers = userService.saveAll(users);
        loggerService.info("Users created :"+createdUsers.size());
        return ResponseEntity.ok().build();
    }

}
