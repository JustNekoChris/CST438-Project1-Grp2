package com.group02.project01;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Objects;

@Entity(tableName = "Pokemon")
public class Pokemon {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    private int id;

    @ColumnInfo(name = "userInfo")
    private String userInfo;

    @ColumnInfo(name = "pokeID")
    private Double pokeID;

    @ColumnInfo(name = "pokeName")
    private String pokeName;

    @ColumnInfo(name = "imageURL")
    private String imageURL;

    public Pokemon(String userInfo, Double pokeID, String pokeName, String imageURL) {
        this.userInfo = userInfo;
        this.pokeID = pokeID;
        this.pokeName = pokeName;
        this.imageURL = imageURL;
    }

    public Pokemon() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(String userInfo) {
        this.userInfo = userInfo;
    }

    public Double getPokeID() {
        return pokeID;
    }

    public void setPokeID(Double pokeID) {
        this.pokeID = pokeID;
    }

    public String getPokeName() {
        return pokeName;
    }

    public void setPokeName(String pokeName) {
        this.pokeName = pokeName;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pokemon pokemon = (Pokemon) o;
        return Objects.equals(getUserInfo(), pokemon.getUserInfo()) && Objects.equals(getPokeID(), pokemon.getPokeID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserInfo(), getPokeID());
    }
}