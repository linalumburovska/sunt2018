package com.fri.sunt.controller;

import com.fri.sunt.entity.Author;
import com.fri.sunt.repository.AuthorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
public class AuthorController {

    private AuthorRepository repository;

    public AuthorController(AuthorRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("/api/author")
    @CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET})
    public Collection<Author> author() {
        return repository.findAll();
    }

    @CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET})
    @RequestMapping(path = "/api/author/{id}", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
    public Author authorById(@PathVariable long id) {
        Optional<Author> project = this.repository.findById(id);

        return project.orElse(null);
    }
}
