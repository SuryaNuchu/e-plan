package com.ooad.eplan.repositories;

import com.ooad.eplan.models.Team;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Class - TeamRepository
 */
@Repository
public interface TeamRepository extends MongoRepository<Team, String> {
}
