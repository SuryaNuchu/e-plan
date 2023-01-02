package com.ooad.eplan.services;

import com.ooad.eplan.models.User;
import com.ooad.eplan.repositories.UserRepository;
import com.ooad.eplan.services.serviceImpl.IImportService;
import com.ooad.eplan.util.ExcelHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
public class XLXSImportService implements IImportService {

    @Autowired
    UserRepository repository;

    public void save(MultipartFile file) {
        try {
            List<User> users = ExcelHelper.excelToUsers(file.getInputStream());
            repository.saveAll(users);
        } catch (IOException e) {
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }
}

