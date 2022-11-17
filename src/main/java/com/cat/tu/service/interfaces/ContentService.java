package com.cat.tu.service.interfaces;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ContentService {
    String store(MultipartFile file, String username);
    Resource loadAsResource(String filename);
}