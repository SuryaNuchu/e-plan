package com.ooad.eplan.controllers;

import com.ooad.eplan.models.Issue;
import com.ooad.eplan.services.IIssueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping(path = "/api/issue")
public class IssueController extends BaseController{

    private final IIssueService issueService;

    public IssueController(IIssueService issueService) {
        this.issueService = issueService;
    }

    @Operation(description = "Get all the Issues within a Project")
    @ApiResponse(responseCode = "200", description = "Issues Retrieved")
    @ApiResponse(responseCode = "400", description = "No Issues assigned")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @GetMapping(value = "/get/{projectId}")
    public List<Issue> getIssues(@PathVariable String projectId){
        List<Issue> issueList = issueService.getAllIssues(projectId);
        log.info("Retrieved all the issues under the Project {}", projectId);
        return issueList;
    }

    @Operation(description = "Create an issue for a Project")
    @ApiResponse(responseCode = "200", description = "Issue Created")
    @ApiResponse(responseCode = "400", description = "Issue cannot be created")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @PostMapping(value = "/create")
    public ResponseEntity createIssue(@RequestBody Issue issue){
        issueService.createIssue(issue);
        log.info("Create the issue");
        return ResponseEntity.ok().build();
    }

    @Operation(description = "Delete the Issue based on the IssueId")
    @ApiResponse(responseCode = "200", description = "Issue Deleted")
    @ApiResponse(responseCode = "400", description = "Invalid Id supplied")
    @ApiResponse(responseCode = "404", description = "Issue not found")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @DeleteMapping(value = "/delete/{issueId}")
    public ResponseEntity deleteIssue(@PathVariable String issueId){
        issueService.delete(issueId);
        log.info("Successfully Deleted");
        return ResponseEntity.ok().build();
    }

    @Operation(description = "Update the status of an Issue")
    @ApiResponse(responseCode = "200", description = "Status updated")
    @ApiResponse(responseCode = "400", description = "Status cannot be updated")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @PatchMapping(value = "/status")
    public ResponseEntity updateStatus(@RequestBody Issue issue){
        issueService.updateStatus(issue);
        log.info("Updated the status");
        return ResponseEntity.ok().build();
    }

}
