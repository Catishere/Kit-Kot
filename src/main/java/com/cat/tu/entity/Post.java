package com.cat.tu.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name="post")
@Getter
@Setter
@ToString
@JsonIgnoreProperties({
    "comments"
})
public class Post {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Column(name="date")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;

    @ElementCollection
    @Column(name="tags")
    private List<String> tags;

    @Column(name="content", columnDefinition="TEXT")
    private String content;

    @Column(name="media_url")
    private String mediaUrl;

    @ManyToOne(cascade = {CascadeType.ALL})
    private Music music;

    @Column(name="likes")
    private int likes;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Comment> comments;

    public Post() {

    }

    public Post(User user, Date date, List<String> tags, String content, String mediaUrl) {
        this.user = user;
        this.date = date;
        this.tags = tags;
        this.content = content;
        this.mediaUrl = mediaUrl;
    }
}
