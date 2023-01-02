package com.ooad.eplan.services.serviceImpl;

import com.ooad.eplan.models.Project;
import com.ooad.eplan.exception.EplanException;
import com.ooad.eplan.repositories.ProjectRepository;
import com.ooad.eplan.services.IProjectService;
import com.ooad.eplan.util.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProjectService implements IProjectService {

    private final ProjectRepository projectRepository;

    private final Utils util;

    public ProjectService(ProjectRepository projectRepository, Utils util) {
        this.projectRepository = projectRepository;
        this.util = util;
    }

    @Override
    public Project save(Project project){
        project.setProjectId(util.getUUID());
        return projectRepository.save(project);
    }

    @Override
    public String delete(String projectId) {
        Project project = findProject(projectId);
        projectRepository.deleteByProjectId(project.getProjectId());
        return projectId;
    }

    @Override
    public List<Project> findAllProjects(String teamId) {
        List<Project> projectList = projectRepository.findByTeamId(teamId);
        return projectList;
    }

    @Override
    public List<Project> findAll() {
        List<Project> projectList = projectRepository.findAll();
        return projectList;
    }

    public Project findProject(String projectId){
        Project project = projectRepository.findByProjectId(projectId);
        if(project == null)
            throw new EplanException("No Project exists with the Id");
        return project;
    }

}
