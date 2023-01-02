package com.ooad.eplan;

import com.ooad.eplan.models.Team;
import com.ooad.eplan.repositories.TeamRepository;
import com.ooad.eplan.services.ITeamService;
import com.ooad.eplan.services.serviceImpl.TeamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TeamTests {

    @Mock
    TeamRepository teamRepository;

    @InjectMocks
    TeamService teamService;

    @Test
    void getTeamByIdTest(){
        Mockito.when(teamRepository.findById("1")).thenReturn(Optional.of(new Team("1", "Team1", "Desc", List.of())));
        Team team = teamService.getTeamById("1");
        assertEquals("Team1",team.getName());
    }

    @Test
    void getTeamsTest() {
        Mockito.when(teamRepository.findAll()).thenReturn(List.of(new Team("1", "Team1", "Desc1", List.of()),
                new Team("2", "Team2", "Desc2", List.of()),
                new Team("3", "Team3", "Desc3", List.of())
        ));

        List<Team> teams = teamService.getTeams();
        assertEquals(3,teams.size());
    }

    @Test
    void saveTeamTest() {
        Team team = new Team("", "Team1", "Desc1", List.of());
        Mockito.when(teamRepository.save(team)).thenReturn(team);

        Team teamFromDB = teamService.save(team);
        assertEquals(team.hashCode(),teamFromDB.hashCode());
    }
}
