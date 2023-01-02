package com.ooad.eplan.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ooad.eplan.controllers.ProjectController;
import com.ooad.eplan.models.Project;
import com.ooad.eplan.models.Team;
import com.ooad.eplan.repositories.ProjectRepository;
import com.ooad.eplan.services.serviceImpl.ProjectService;
import com.ooad.eplan.util.Utils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {

    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private Utils util;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {objectMapper = new ObjectMapper(); }

    @Test
    public void save() throws IOException {
        File mockProjectDetails =
                new File("src/test/Files/Project.json");

        Project project = objectMapper.readValue(mockProjectDetails, Project.class);
        Mockito.when(util.getUUID()).thenReturn(project.getProjectId());
        Mockito.when(projectRepository.save(project)).thenReturn(project);

        Project projectSaved = projectService.save(project);

        assertNotNull(projectSaved);
        assertEquals(project,projectSaved);
    }

    @Test
    public void findAllProjects() throws IOException {
        File mockProjectDetails =
                new File("src/test/Files/Project.json");

        Project project = objectMapper.readValue(mockProjectDetails, Project.class);

        List<Project> projectList = new ArrayList<>();
        projectList.add(project);

        Mockito.when(projectService.findAllProjects(project.getTeamId())).thenReturn(projectList);

        List<Project> projects = projectRepository.findByTeamId(project.getTeamId());

        assertNotNull(projects);
        assertEquals(1,projects.size());

    }

    @Test
    public void findAll() throws IOException {
        File mockProjectDetails =
                new File("src/test/Files/Project.json");
        File mockProjectDetails1 =
                new File("src/test/Files/Project1.json");
        File mockProjectDetails2 =
                new File("src/test/Files/Project2.json");

        List<Project> projectList = new ArrayList<>();

        projectList.add(objectMapper.readValue(mockProjectDetails,Project.class));
        projectList.add(objectMapper.readValue(mockProjectDetails1,Project.class));
        projectList.add(objectMapper.readValue(mockProjectDetails2,Project.class));

        Mockito.when(projectRepository.findAll()).thenReturn(projectList);

        List<Project> projects = projectService.findAll();

        assertTrue(!projects.isEmpty());
        assertEquals(projects.size(),3);

    }

    @Test
    public void delete() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Project.json");

        Project project = objectMapper.readValue(mockProjectDetails, Project.class);

        Mockito.when(projectRepository.findByProjectId(project.getProjectId())).thenReturn(project);
        Mockito.when(projectService.findProject(project.getProjectId())).thenReturn(project);

        Mockito.doNothing().when(projectRepository).deleteByProjectId(project.getProjectId());

        String projectId = projectService.delete(project.getProjectId());
        assertTrue(projectId!= null);
        assertEquals(project.getProjectId(),projectId);
    }
}
