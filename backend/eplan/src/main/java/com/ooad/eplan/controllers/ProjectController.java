package com.ooad.eplan.controllers;

import com.ooad.eplan.enums.Role;
import com.ooad.eplan.models.Project;
import com.ooad.eplan.models.Team;
import com.ooad.eplan.models.User;
import com.ooad.eplan.services.IProjectService;
import com.ooad.eplan.services.ITeamService;
import com.ooad.eplan.util.Utils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping(path = "/api/project")
public class ProjectController extends BaseController{


    private final IProjectService projectService;

    @Autowired
    ITeamService teamService;

    @Autowired
    TeamController teamController;

    public ProjectController(IProjectService projectService,Utils util) {
        this.projectService = projectService;
    }

    @Operation(description = "Create new Project")
    @ApiResponse(responseCode = "201", description = "Project Created")
    @ApiResponse(responseCode = "400", description = "Invalid Id supplier")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @PostMapping(value = "/save")
    public ResponseEntity saveProject(@RequestBody Project project){
        projectService.save(project);
        log.info("Project created : {}",project.getProjectId());
        return ResponseEntity.ok().build();
    }

    @Operation(description = "Delete the Project based on the ProjectId")
    @ApiResponse(responseCode = "200", description = "Project Deleted")
    @ApiResponse(responseCode = "400", description = "Invalid Id supplied")
    @ApiResponse(responseCode = "404", description = "Project not found")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @DeleteMapping(value = "/delete/{projectId}")
    public ResponseEntity deleteProject(@PathVariable String projectId){
        projectService.delete(projectId);
        log.info("Successfully Deleted");
        return ResponseEntity.ok().build();
    }

    @Operation(description = "Get all the Projects associated with a team")
    @ApiResponse(responseCode = "200", description = "Projects Retrieved")
    @ApiResponse(responseCode = "400", description = "No Projects assigned")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @PostMapping(value = "/getProjects")
    public List<Project> getProjects(@RequestBody String teamId){
        List<Project> projectList = projectService.findAllProjects(teamId);
        log.info("Retrieved all the projects");
        return projectList;
    }

    @GetMapping(value = "/all/{orgId}/{userId}")
    public List<Project> getAllProjects(@PathVariable String orgId, @PathVariable String userId){
       List<Team> teams = teamController.getTeams(orgId, userId);
       List<String> teamIds = teams.stream().map(t->t.getId()).collect(Collectors.toList());
        List<Project> projectList = projectService.findAll().stream().filter(p->p.getOrgId().equals(orgId)).filter(p-> teamIds.contains(p.getTeamId())).collect(Collectors.toList());
        log.info("Retrieved all the projects");
        return projectList;
    }

    @GetMapping(value = "/{projectId}")
    public Project getProjectById(@PathVariable String projectId){
        Project project = projectService.findProject(projectId);
        log.info("Retrieved a project");
        return project;
    }
}
