package com.group02.project01;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.*;

@Entity(tableName = "Teams")
public class Team {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    private int id;

    @ColumnInfo(name = "userInfo")
    private String userInfo;

    @ColumnInfo(name = "teamName")
    private String teamName;

    @ColumnInfo(name = "pokeID1")
    private String pokeID1;

    @ColumnInfo(name = "pokeID2")
    private String pokeID2;

    @ColumnInfo(name = "pokeID3")
    private String pokeID3;

    @ColumnInfo(name = "pokeID4")
    private String pokeID4;

    @ColumnInfo(name = "pokeID5")
    private String pokeID5;

    @ColumnInfo(name = "pokeID6")
    private String pokeID6;

    public Team(String userInfo, String teamName) {
        this.userInfo = userInfo;
        this.teamName = teamName;
        this.pokeID1 = "";
        this.pokeID2 = "";
        this.pokeID3 = "";
        this.pokeID4 = "";
        this.pokeID5 = "";
        this.pokeID6 = "";
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

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getPokeID1() {
        return pokeID1;
    }

    public void setPokeID1(String pokeID1) {
        this.pokeID1 = pokeID1;
    }

    public String getPokeID2() {
        return pokeID2;
    }

    public void setPokeID2(String pokeID2) {
        this.pokeID2 = pokeID2;
    }

    public String getPokeID3() {
        return pokeID3;
    }

    public void setPokeID3(String pokeID3) {
        this.pokeID3 = pokeID3;
    }

    public String getPokeID4() {
        return pokeID4;
    }

    public void setPokeID4(String pokeID4) {
        this.pokeID4 = pokeID4;
    }

    public String getPokeID5() {
        return pokeID5;
    }

    public void setPokeID5(String pokeID5) {
        this.pokeID5 = pokeID5;
    }

    public String getPokeID6() {
        return pokeID6;
    }

    public void setPokeID6(String pokeID6) {
        this.pokeID6 = pokeID6;
    }

    /**
     * 
     * @return A List with all pokemon ID values
     */
    public List<String> getValuesAsList() {
        return Arrays.asList(this.getPokeID1(), this.getPokeID2(), this.getPokeID3(), this.getPokeID4(), this.getPokeID5(), this.getPokeID6());
    }

    public void setValuesFromList(List<String> listValues) {
        this.setPokeID1(listValues.get(0));
        this.setPokeID2(listValues.get(1));
        this.setPokeID3(listValues.get(2));
        this.setPokeID4(listValues.get(3));
        this.setPokeID5(listValues.get(4));
        this.setPokeID6(listValues.get(5));
    }

    /**
     * 
     * @param pokeId The ID of the pokemon you wish to add 
     * @return 0 if pokemon was successfully added, 1 if there was no space
     */
    public int addPokemon(String pokeId) {
        List<String> listValues = this.getValuesAsList();

        for (int i = 0; i < listValues.size(); i++) {
            if (listValues.get(i).equals("")) {
                listValues.set(i, pokeId);
                setValuesFromList(listValues);
                return 0;
            }
        }

        return 1;
    }

    /**
     * Removes a pokemon and shifts remaining to fill its spot
     * @param index The index of the pokemon to remove
     */
    public void removePokemon(int index) {
        List<String> listValues = this.getValuesAsList();

        listValues.set(index, "");
        for (int i = index; i < listValues.size() - 1; i++) {
            if (!listValues.get(i + 1).equals("")) {
                listValues.set(i, listValues.get(i + 1));
            } else {
                listValues.set(i, "");
            }
        }

        listValues.set(listValues.size() - 1, "");
    }

    @Override
    public String toString() {
        return "Team{" +
                "userInfo='" + userInfo + '\'' +
                ", teamName='" + teamName + '\'' +
                ", pokeID1='" + pokeID1 + '\'' +
                ", pokeID2='" + pokeID2 + '\'' +
                ", pokeID3='" + pokeID3 + '\'' +
                ", pokeID4='" + pokeID4 + '\'' +
                ", pokeID5='" + pokeID5 + '\'' +
                ", pokeID6='" + pokeID6 + '\'' +
                '}';
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Team team = (Team) o;
        return Objects.equals(getUserInfo(), team.getUserInfo()) && Objects.equals(getTeamName(), team.getTeamName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserInfo(), getTeamName());
    }
}
