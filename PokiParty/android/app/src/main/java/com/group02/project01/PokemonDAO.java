package com.group02.project01;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface PokemonDAO {
    @Insert
    void add(Pokemon p);

    @Delete
    void delete(Pokemon p);

    // New method to delete a pokemon based on pokeID and userInfo
    @Query("DELETE FROM Pokemon WHERE userInfo = :userInfo AND pokeID = :pokeID")
    void deleteByPokeIDAndUserInfo(String userInfo, Double pokeID);

    @Update
    void update(Pokemon p);

    @Query("SELECT * FROM Pokemon")
    List<Pokemon> getAll();

    // New method to get all pokemon by userInfo
    @Query("SELECT * FROM Pokemon WHERE userInfo = :userInfo")
    List<Pokemon> getAllByUserInfo(String userInfo);

    // New method to check if a pokemon with userInfo and pokeID exists
    @Query("SELECT EXISTS(SELECT 1 FROM Pokemon WHERE userInfo = :userInfo AND pokeID = :pokeID)")
    boolean exists(String userInfo, Double pokeID);
}

