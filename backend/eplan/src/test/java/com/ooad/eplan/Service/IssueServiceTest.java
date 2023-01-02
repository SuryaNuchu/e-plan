package com.ooad.eplan.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ooad.eplan.models.Issue;
import com.ooad.eplan.repositories.IssueRepository;
import com.ooad.eplan.repositories.ProjectRepository;
import com.ooad.eplan.services.serviceImpl.IssueService;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class IssueServiceTest {

    @InjectMocks
    private IssueService issueService;

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private Utils util;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {objectMapper = new ObjectMapper(); }

    @Test
    public void getAllIssues() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Issue.json");
        File mockProjectDetails1 =
                new File("src/test/Files/Issue1.json");

        Issue issue = objectMapper.readValue(mockProjectDetails, Issue.class);
        Issue issue1 = objectMapper.readValue(mockProjectDetails1, Issue.class);

        List<Issue> issueList = new ArrayList<>();
        issueList.add(issue);
        issueList.add(issue1);

        Mockito.when(issueRepository.findByProjectId(issue.getProjectId())).thenReturn(issueList);

        List<Issue> issues = issueService.getAllIssues(issue.getProjectId());

        assertNotNull(!issues.isEmpty());
        assertEquals(2,issues.size());
    }

    @Test
    public void createIssue() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Issue.json");

        Issue issue = objectMapper.readValue(mockProjectDetails, Issue.class);
        Mockito.when(util.getUUID()).thenReturn("5662c1d0-e94f-43e3-ac38-e6a24992328c");
        Mockito.when(issueRepository.save(issue)).thenReturn(issue);

        String issueId = issueService.createIssue(issue);

        assertNotNull(issueId);
        assertEquals(issueId, issue.getId());
    }

    @Test
    public void updateStatus() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Issue.json");

        Issue issue = objectMapper.readValue(mockProjectDetails, Issue.class);

        Mockito.when(issueRepository.save(issue)).thenReturn(issue);

        issueService.updateStatus(issue);

        verify(issueRepository,times(1)).save(any(Issue.class));
    }

}
