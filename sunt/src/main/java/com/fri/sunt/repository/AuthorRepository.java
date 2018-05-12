package com.fri.sunt.repository;

import com.fri.sunt.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@RepositoryRestResource
@CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.GET})
public interface AuthorRepository extends JpaRepository<Author, Long> {

}
