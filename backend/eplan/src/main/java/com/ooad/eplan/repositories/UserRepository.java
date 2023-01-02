package com.ooad.eplan.repositories;

import com.ooad.eplan.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Class - UserRepository
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);
}
