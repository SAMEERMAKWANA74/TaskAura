package com.example.demo.controller;


import com.example.demo.model.Project;
import com.example.demo.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*") // Allow any origin for Render deployment
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return service.createProject(project);
    }

    // READ ALL
    @GetMapping
    public List<Project> getAllProjects() {
        return service.getAllProjects();
    }

    // READ BY USER
    @GetMapping("/user/{userId}")
    public List<Project> getProjectsByUserId(@PathVariable String userId) {
        return service.getProjectsByUserId(userId);
    }

    // READ ONE
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable String id) {
        return service.getProjectById(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable String id) {
        service.deleteProject(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable String id, @RequestBody Project project) {
        return service.updateProject(id, project);
    }
}
