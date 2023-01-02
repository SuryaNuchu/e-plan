package com.ooad.eplan.services.serviceImpl;

import com.ooad.eplan.models.Team;
import com.ooad.eplan.repositories.TeamRepository;
import com.ooad.eplan.services.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * class - TeamService
 */
@Service
public class TeamService implements ITeamService {

    /**
     * instance - teamRepository
     */
    @Autowired
    TeamRepository teamRepository;

    /**
     * Method - getTeams
     * @return List<Team>
     */
    @Override
    public List<Team> getTeams() {
        return teamRepository.findAll();
    }

    /**
     * Method - getTeamById
     * @param id
     * @return Team
     */
    @Override
    public Team getTeamById(String id) {
        return teamRepository.findById(id).get();
    }

    /**
     * Method - save
     * @param team
     * @return
     */
    @Override
    public Team save(Team team) {
        return teamRepository.save(team);
    }

    /**
     * Method - delete
     * @param teamId
     */
    @Override
    public void delete(String teamId) {
        teamRepository.deleteById(teamId);
    }
}
