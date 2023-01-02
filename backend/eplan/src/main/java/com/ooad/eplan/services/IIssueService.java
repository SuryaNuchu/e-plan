package com.ooad.eplan.services;

import com.ooad.eplan.models.Issue;

import java.util.List;

public interface IIssueService {
    List<Issue> getAllIssues(String projectId);

    String createIssue(Issue issue);

    void delete(String issueId);

    void updateStatus(Issue issue);
}
