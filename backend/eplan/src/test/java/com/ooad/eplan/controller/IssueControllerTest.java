package com.ooad.eplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ooad.eplan.controllers.IssueController;
import com.ooad.eplan.controllers.ProjectController;
import com.ooad.eplan.models.Issue;
import com.ooad.eplan.models.Project;
import com.ooad.eplan.services.IIssueService;
import com.ooad.eplan.services.IProjectService;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
public class IssueControllerTest {

    @Mock
    private IIssueService issueService;

    @InjectMocks
    private IssueController issueController;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {objectMapper = new ObjectMapper(); }

    @Test
    public void createIssue() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Issue.json");

        Issue issue = objectMapper.readValue(mockProjectDetails, Issue.class);
        Mockito.when(issueService.createIssue(issue)).thenReturn(issue.getId());

        String issueId = issueService.createIssue(issue);

        assertNotNull(issueId);
        assertEquals(issueId, issue.getId());
    }

    @Test
    public void getIssues() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Issue.json");
        File mockProjectDetails1 =
                new File("src/test/Files/Issue1.json");

        Issue issue = objectMapper.readValue(mockProjectDetails, Issue.class);
        Issue issue1 = objectMapper.readValue(mockProjectDetails1, Issue.class);

        List<Issue> issueList = new ArrayList<>();
        issueList.add(issue);
        issueList.add(issue1);

        Mockito.when(issueService.getAllIssues(issue.getProjectId())).thenReturn(issueList);

        List<Issue> issues = issueController.getIssues(issue.getProjectId());

        assertNotNull(!issues.isEmpty());
        assertEquals(2,issues.size());
    }

    @Test
    public void updateStatus() throws Exception{
        File mockProjectDetails =
                new File("src/test/Files/Issue.json");

        Issue issue = objectMapper.readValue(mockProjectDetails, Issue.class);

        Mockito.doNothing().when(issueService).updateStatus(issue);

        ResponseEntity response = issueController.updateStatus(issue);

        assertNotNull(response);
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }
}
