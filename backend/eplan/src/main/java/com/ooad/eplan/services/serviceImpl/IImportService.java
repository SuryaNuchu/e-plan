package com.ooad.eplan.services.serviceImpl;

import org.springframework.web.multipart.MultipartFile;

public interface IImportService {
    public void save(MultipartFile file);
}
