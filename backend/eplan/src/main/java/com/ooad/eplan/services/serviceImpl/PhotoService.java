package com.ooad.eplan.services.serviceImpl;

import com.ooad.eplan.exception.EplanException;
import com.ooad.eplan.models.Photo;
import com.ooad.eplan.repositories.PhotoRepository;
import com.ooad.eplan.services.IPhotoService;
import com.ooad.eplan.util.Utils;
import lombok.extern.slf4j.Slf4j;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Slf4j
public class PhotoService implements IPhotoService {

    private PhotoRepository photoRepo;

    private Utils util;

    public PhotoService(PhotoRepository photoRepo, Utils util){
        this.photoRepo = photoRepo;
        this.util = util;
    }

    @Override
    public void addAttachment(String title, String issueId, MultipartFile file) throws IOException {
        Photo photo = new Photo(util.getUUID(),issueId,title);
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepo.insert(photo);
        //return photo.getId();
        return;
    }

    @Override
    public void delete(String id) {
        Photo photo = getPhoto(id);
        if(photo == null)
            throw new EplanException("Attachment not found");
        photoRepo.deleteById(id);
        return;
    }

    public Photo getPhoto(String id) {
        return photoRepo.findById(id).get();
    }

}
