package com.ooad.eplan.services.serviceImpl;

import com.ooad.eplan.exception.EplanException;
import com.ooad.eplan.models.User;
import com.ooad.eplan.repositories.UserRepository;
import com.ooad.eplan.services.IUserService;
import com.ooad.eplan.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Class - UserService
 */
@Service
public class UserService implements IUserService {

    /**
     * Instance - userRepository
     */
    @Autowired
    UserRepository userRepository;

    EplanException eplanException;

    @Autowired
    Utils utils;

    @Value("${password_security_chain}")
    String password_security_chain;

    /**
     * Method - getUsers
     * @return List<User>
     */
    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /**
     * Method - getUserById
     * @param id
     * @return User
     */
    @Override
    public User getUserById (String id){
        try {
            return userRepository.findById(id).get();
        }
        catch (Exception e){
            throw new EplanException("user with the given id does not exist");
        }
    }


    /**
     * Method - save
     * @param user
     * @return User
     */
    @Override
    public User save(User user) {
        if (user.getName().isEmpty()|| user.getEmail().isEmpty()){
            throw new EplanException("cannot create user with given details");
        }
        if(user.getPassword() == null || user.getPassword().trim().equals(""))
            user.setPassword( utils.getProtectedPassword(user.getName().split(" ")[0]+"eplan@1",password_security_chain));
        else
            user.setPassword( utils.getProtectedPassword(user.getPassword(),password_security_chain));
        return userRepository.save(user);
    }

    /**
     * Method - saveAll
     * @param users
     * @return List<User>
     */
    @Override
    public List<User> saveAll(List<User> users) {
        users.forEach(user -> {
            user.setPassword(user.getName().split(" ")[0] + "eplan@1");
        });
        return userRepository.saveAll(users);
    }


    /**
     * Method - delete
     * @param userId
     */
    @Override
    public void delete(String userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        }
        else {
            throw new EplanException("there is no user in db with given id");
        }
    }

    /**
     * getUserByEmail
     * @param email
     * @return User
     */
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean authenticate(String email, String password) {
        User user = getUserByEmail(email);
        if(user==null) return false;
        return user.getPassword().equals(utils.getProtectedPassword(password,password_security_chain));
    }

}
