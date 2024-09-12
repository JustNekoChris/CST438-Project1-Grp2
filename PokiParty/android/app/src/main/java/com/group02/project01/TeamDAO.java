package com.group02.project01;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface TeamDAO {
    @Insert
    void add(Team t);

    @Delete
    void delete(Team t);

    @Update
    void update(Team t);

    @Query("SELECT * FROM Teams")
    List<Team> getAll();

    @Query("SELECT * FROM Teams WHERE userInfo = :userInfo")
    List<Team> getAllByUserInfo(String userInfo);

    // New method to check if a team with userInfo and teamName exists
    @Query("SELECT EXISTS(SELECT 1 FROM Teams WHERE userInfo = :userInfo AND teamName = :teamName)")
    boolean exists(String userInfo, String teamName);

    // New method to delete a team by ID
    @Query("DELETE FROM Teams WHERE id = :teamId")
    void deleteById(int teamId);
}

