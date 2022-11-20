package com.cat.tu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity(name="comment")
@Getter
@Setter
@ToString
@JsonIgnoreProperties({
        "post"
})
public class Comment {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "author_id")

    private User author;

    @Column(name = "date")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    private String content;

    public Comment() {

    }

    public Comment(User author, Post post, String content) {
        this.author = author;
        this.date = new Date();
        this.post = post;
        this.content = content;
    }

}
