package com.ooad.eplan.services;

import com.ooad.eplan.models.Team;

import java.util.List;

/**
 * Class - ITeamService
 */
public interface ITeamService{
    public List<Team> getTeams();
    public Team getTeamById(String id);
    public Team save(Team team);
    public void delete(String teamId);
}
