package com.ooad.eplan.services.serviceImpl;

import com.ooad.eplan.exception.EplanException;
import com.ooad.eplan.models.Issue;
import com.ooad.eplan.models.Project;
import com.ooad.eplan.repositories.IssueRepository;
import com.ooad.eplan.services.IIssueService;
import com.ooad.eplan.util.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class IssueService implements IIssueService {

    private final IssueRepository issueRepository;

    private final Utils util;


    public IssueService(IssueRepository issueRepository, Utils util) {
        this.issueRepository = issueRepository;
        this.util = util;
    }

    @Override
    public List<Issue> getAllIssues(String projectId) {
        List<Issue> issueList = issueRepository.findByProjectId(projectId);
        return issueList;
    }

    @Override
    public String createIssue(Issue issue) {
        issue.setId(util.getUUID());
        issueRepository.save(issue);
        return issue.getId();
    }

    @Override
    public void delete(String issueId) {
        Issue issue = issueRepository.findById(issueId).get();
        if(issue==null)
            throw new EplanException("No Issue exists with the Id");
        issueRepository.deleteById(issue.getId());
    }

    @Override
    public void updateStatus(Issue issue) {
        issueRepository.save(issue);
        return;
    }
}
