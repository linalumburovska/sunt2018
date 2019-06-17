package com.fri.sunt.entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;


@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    @NotNull
    private Integer orderIndex;

    private String title;

    private String englishTitle;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Author> author;

    private String description;

    private String englishDescription;

    private Theme theme;

    private String makeYear;

    private String comment;

    private String englishComment;

    private String type;

    private String englishType;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Image> image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer index) {
        this.orderIndex = index;
    }

    public String getEnglishDescription() {
        return englishDescription;
    }

    public void setEnglishDescription(String englishDescription) {
        this.englishDescription = englishDescription;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEnglishTitle() {
        return englishTitle;
    }

    public void setEnglishTitle(String englishTitle) {
        this.englishTitle = englishTitle;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public List<Author> getAuthor() {
        return author;
    }

    public void setAuthor(List<Author> author) {
        this.author = author;
    }

    public List<Image> getImage() {
        return image;
    }

    public void setImage(List<Image> image) {
        this.image = image;
    }

    public String getMakeYear() {
        return makeYear;
    }

    public void setMakeYear(String makeYear) {
        this.makeYear = makeYear;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment= comment;
    }

    public String getEnglishComment() {
        return englishComment;
    }

    public void setEnglishComment(String englishComment) {
        this.englishComment= englishComment;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type= type;
    }

    public String getEnglishType() {
        return englishType;
    }

    public void setEnglishType(String englishType) {
        this.englishType= englishType;
    }
}
