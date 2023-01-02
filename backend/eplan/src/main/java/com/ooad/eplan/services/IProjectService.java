package com.ooad.eplan.services;

import com.ooad.eplan.models.Issue;
import com.ooad.eplan.models.Project;

import java.util.List;

public interface IProjectService {

    Project save(Project project);

    String delete(String projectId);

    List<Project> findAllProjects(String teamId);

    List<Project> findAll();

    Project findProject(String projectId);
}
