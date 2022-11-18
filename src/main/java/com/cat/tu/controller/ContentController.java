package com.cat.tu.controller;

import com.cat.tu.dto.UploadFileResponse;
import com.cat.tu.service.interfaces.ContentService;
import com.cat.tu.util.JWTUtil;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequestMapping("/api/content")
@Controller
public class ContentController {

    private final ContentService contentService;
    private final JWTUtil jwtUtil;

    public ContentController(ContentService contentService, JWTUtil jwtUtil) {
        this.contentService = contentService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadFileResponse> uploadFile(@RequestParam("file") MultipartFile file,
                                                         @RequestHeader("Authorization") String token) {
        String username = jwtUtil.validateTokenAndRetrieveSubject(token.substring("Bearer ".length()));
        String fileName = contentService.store(file, username);
        String fileDownloadUri = "/api/content/" + fileName;

        return new ResponseEntity<>(new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize()), HttpStatus.OK);
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = contentService.loadAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            System.out.println("Could not determine file type.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}