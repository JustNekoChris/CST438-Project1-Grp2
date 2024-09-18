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

    @Update
    void update(Pokemon p);

    @Query("SELECT * FROM Pokemon")
    List<Pokemon> getAll();

    @Query("SELECT * FROM Pokemon WHERE userInfo = :userInfo")
    List<Pokemon> getAllByUserInfo(String userInfo);

    // New method to check if a pokemon with userInfo and pokeID exists
    @Query("SELECT EXISTS(SELECT 1 FROM Pokemon WHERE userInfo = :userInfo AND pokeName = :pokeName)")
    boolean exists(String userInfo, String pokeName);
}

