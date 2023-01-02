package com.ooad.eplan.repositories;

import com.ooad.eplan.models.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    public void deleteByProjectId(String projectId);

    public Project findByProjectId(String projectId);

    List<Project> findByTeamId(String teamId);
}
