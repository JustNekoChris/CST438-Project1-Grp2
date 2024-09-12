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
    private String pokeID;

    public Pokemon(String pokeID, String userInfo) {
        this.pokeID = pokeID;
        this.userInfo = userInfo;
    }

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

    public String getPokeID() {
        return pokeID;
    }

    public void setPokeID(String pokeID) {
        this.pokeID = pokeID;
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