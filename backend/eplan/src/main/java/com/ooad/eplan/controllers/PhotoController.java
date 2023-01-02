package com.ooad.eplan.controllers;

import com.ooad.eplan.models.Photo;
import com.ooad.eplan.models.Project;
import com.ooad.eplan.services.IPhotoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping(path = "/photo")
public class PhotoController extends BaseController{

    private final IPhotoService photoService;

    public PhotoController(IPhotoService photoService) {
        this.photoService = photoService;
    }

    @Operation(description = "Create new Attachment")
    @ApiResponse(responseCode = "201", description = "Attachment Created")
    @ApiResponse(responseCode = "400", description = "Invalid Id supplied")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @PostMapping(value = "/save")
    public ResponseEntity addAttachement(@RequestParam("title") String title, @RequestParam("issueId") String issueId,
                                         @RequestParam("image") MultipartFile image) throws IOException {
        photoService.addAttachment(title,issueId,image);
        log.info("Attachment created : {}",title);
        return ResponseEntity.ok().build();
    }

    @Operation(description = "Delete the Attachment based on the AttachmentId")
    @ApiResponse(responseCode = "200", description = "Attachment Deleted")
    @ApiResponse(responseCode = "400", description = "Invalid Id supplied")
    @ApiResponse(responseCode = "404", description = "Attachment not found")
    @ApiResponse(responseCode = "500", description = "Internal Server Error")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteAttachment(@PathVariable String id){
        photoService.delete(id);
        log.info("Successfully Deleted");
        return ResponseEntity.ok().build();
    }
}
