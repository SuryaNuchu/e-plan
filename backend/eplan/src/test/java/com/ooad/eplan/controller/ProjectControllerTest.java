package com.ooad.eplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ooad.eplan.controllers.ProjectController;
import com.ooad.eplan.models.Project;
import com.ooad.eplan.services.IProjectService;
import com.ooad.eplan.services.serviceImpl.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class ProjectControllerTest {

    @Mock
    private IProjectService projectService;

    @InjectMocks
    private ProjectController projectController;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {objectMapper = new ObjectMapper(); }

    @Test
    public void saveProject() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Project.json");

        Project project = objectMapper.readValue(mockProjectDetails, Project.class);
        Mockito.when(projectService.save(project)).thenReturn(project);

        ResponseEntity response = projectController.saveProject(project);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void deleteProject() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Project.json");

        Project project = objectMapper.readValue(mockProjectDetails, Project.class);

        Mockito.when(projectService.delete(project.getProjectId())).thenReturn(project.getProjectId());

        ResponseEntity response = projectController.deleteProject(project.getProjectId());

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void getProjectById() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Project.json");

        Project project = objectMapper.readValue(mockProjectDetails, Project.class);

        Mockito.when(projectService.findProject(project.getProjectId())).thenReturn(project);

        Project projectFetched = projectController.getProjectById(project.getProjectId());

        assertNotNull(projectFetched);
        assertEquals(project.getProjectId(), projectFetched.getProjectId());
    }

    @Test
    public void getProjects() throws IOException{
        File mockProjectDetails =
                new File("src/test/Files/Project1.json");

        Project project = objectMapper.readValue(mockProjectDetails, Project.class);
        List<Project> projectList = new ArrayList<>();
        projectList.add(project);
        Mockito.when(projectService.findAllProjects(project.getTeamId())).thenReturn(projectList);

        List<Project> projects = projectController.getProjects(project.getTeamId());

        assertTrue(projects.size()==1);
        assertEquals(projects.get(0),projectList.get(0));
    }

    @Test
    public void getAllProjects() throws IOException {
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

    }
}
