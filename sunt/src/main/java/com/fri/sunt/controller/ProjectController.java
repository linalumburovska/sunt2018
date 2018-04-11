package com.fri.sunt.controller;


import com.fri.sunt.entity.Project;
import com.fri.sunt.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
public class ProjectController {

    private ProjectRepository repository;

    public ProjectController(ProjectRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("/api/projects")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"}, methods = {RequestMethod.GET})
    public Collection<Project> project() {
        return repository.findAll();
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"}, methods = {RequestMethod.GET})
    @RequestMapping(path = "/api/project/{id}", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
    public Project projectByIndex(@PathVariable int id) {
        Optional<Project> project = this.repository.findByOrderIndex(id);

        // TODO throw exception
        return project.orElse(null);
    }
}
