package com.ooad.eplan.services;

import com.ooad.eplan.models.Photo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IPhotoService {

    void addAttachment(String title, String issueId, MultipartFile image) throws IOException;

    void delete(String id);
}
