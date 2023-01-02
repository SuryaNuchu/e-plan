package com.ooad.eplan.controllers;

import com.ooad.eplan.enums.Role;
import com.ooad.eplan.models.Team;
import com.ooad.eplan.models.User;
import com.ooad.eplan.services.ILoggerService;
import com.ooad.eplan.services.ITeamService;

import com.ooad.eplan.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Class - TeamController
 */
@CrossOrigin
@RestController
@RequestMapping(path = "/api/team")
public class TeamController extends BaseController{

    /**
     * ITeamService
     */
    @Autowired
    ITeamService teamService;

    @Autowired
    IUserService userService;

    @Autowired
    ILoggerService loggerService;

    /**
     * Method - getTeams
     * @return List of teams
     */
    @GetMapping(value = "/all/{orgId}/{userId}")
    public List<Team> getTeams(@PathVariable String orgId, @PathVariable String userId){
        List<Team> teams = teamService.getTeams().stream().filter(t->t.getOrgId().equals(orgId)).collect(Collectors.toList());
        User user = userService.getUserById(userId);
        if(user.getRole() == Role.STAFF){
            teams = teams.stream().filter(t->t.getMembers().contains(userId)).collect(Collectors.toList());
        }
        loggerService.info("Retrieved all the teams");
        return teams;
    }

    /**
     * Method - saveTeam
     * @param team
     * @return ResponseEntity
     */
    @PostMapping(value = "/save")
    public ResponseEntity saveTeam(@RequestBody Team team){
        Team createdTeam = teamService.save(team);
        loggerService.info("Team created :"+createdTeam.getId());
        return ResponseEntity.ok().build();
    }

    /**
     * Method - updateTeam
     * @param team
     * @return
     */
    @PatchMapping(value = "/update")
    public ResponseEntity updateTeam(@RequestBody Team team){
        Team updatedTeam = teamService.save(team);
        loggerService.info("Team updated :"+updatedTeam);
        return ResponseEntity.ok().build();
    }

    /**
     * Method - getTeamById
     * @return User
     */
    @GetMapping(value = "/{id}")
    public Team getTeamById(@PathVariable String id){
        Team team = teamService.getTeamById(id);
        loggerService.info("Retrieved Team: "+team.getName());
        return team;
    }

    /**
     * Method - deleteTeam
     * @param teamId
     * @return
     */
    @DeleteMapping(value = "/delete/{teamId}")
    public ResponseEntity deleteTeam(@PathVariable String teamId){
        teamService.delete(teamId);
        loggerService.info("Successfully Deleted");
        return ResponseEntity.ok().build();
    }

}
