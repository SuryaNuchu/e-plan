package com.ooad.eplan.services;

import com.ooad.eplan.models.User;

import java.util.List;

/**
 * Interface - IUserService
 */
public interface IUserService {
    public List<User> getUsers();
    public User getUserById(String id);
    public User save(User user);
    public List<User> saveAll(List<User> users);
    public void delete(String userId);
    User getUserByEmail(String email);
    boolean authenticate(String username, String password);
}
