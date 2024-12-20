package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Language")
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private int LanguageID;
    
    @Column(name = "Language", nullable = false)
    private String Language;

    @Column(name = "Level", nullable = false)
    private String Level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cvid")
    private CV cvid;
}
