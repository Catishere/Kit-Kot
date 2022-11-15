package com.cat.tu.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity(name="music")
@Getter
@Setter
@ToString
public class Music {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="link")
    private String link;

    public Music () {
    }

    public Music(String name, String link) {
        this.name = name;
        this.link = link;
    }

}
