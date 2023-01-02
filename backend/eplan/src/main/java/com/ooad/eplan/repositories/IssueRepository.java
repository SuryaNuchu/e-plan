package com.ooad.eplan.repositories;

import com.ooad.eplan.models.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends MongoRepository<Issue, String> {
    List<Issue> findByProjectId(String projectId);
}
