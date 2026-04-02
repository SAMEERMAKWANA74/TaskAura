package com.example.demo.service;



import com.example.demo.model.Project;
import com.example.demo.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public Project createProject(Project project) {
        return repository.save(project);
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public List<Project> getProjectsByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    public Project getProjectById(String id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteProject(String id) {
        repository.deleteById(id);
    }

    public Project updateProject(String id, Project project) {
        Project existing = repository.findById(id).orElse(null);
        if (existing != null) {
            project.setId(id);
            return repository.save(project);
        }
        return null;
    }
}
