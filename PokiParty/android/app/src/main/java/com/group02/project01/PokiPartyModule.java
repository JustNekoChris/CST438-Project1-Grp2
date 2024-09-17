package com.group02.project01;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;

public class PokiPartyModule extends ReactContextBaseJavaModule {

    private PokiPartyDatabase db;
    private final Gson gson = new Gson();

    PokiPartyModule(ReactApplicationContext context) {
        super(context);
        db = PokiPartyDatabase.getInstance(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "PokiPartyModule";  // This name will be used in JavaScript
    }

    // Example of inserting a team
    @ReactMethod
    public void insertTeam(String userInfo, String teamName, String pokeID1, String pokeID2, String pokeID3, String pokeID4, String pokeID5, String pokeID6, Promise promise) {
        new Thread(() -> {
            try {
                Team team = new Team(userInfo, teamName, pokeID1, pokeID2, pokeID3, pokeID4, pokeID5, pokeID6);
                db.team().add(team);
                promise.resolve("Team inserted successfully");
            } catch (Exception e) {
                promise.reject("Error inserting team", e);
            }
        }).start();
    }

    /**
     * Method for removing a pokemon from a team
     * @param teamId ID of team
     * @param index 0 indexed spot to remove pokemon from
     * @param promise
     */
    @ReactMethod
    public void removeTeamMember(int teamId, int index, Promise promise) {
        new Thread(() -> {
            try {
                Team team = db.team().getById(teamId);
                team.removePokemon(index);
                promise.resolve("Team member removed successfully");
            } catch (Exception e) {
                promise.reject("Error removing team member", e);
            }
        }).start();
    }
    
    /**
     * Method for adding a pokemon to an existing team
     * @param teamId ID of team
     * @param pokeId ID of pokemon to insert
     * @param promise
     */
    @ReactMethod
    public void addTeamMember(int teamId, String pokeId, Promise promise) {
        new Thread(() -> {
            try {
                Team team = db.team().getById(teamId);
                Integer returnCode = team.addPokemon(pokeId);
                if (returnCode.equals(1)) {
                    throw Exception("Team is full");
                }
                promise.resolve("Team member added successfully");
            } catch (Exception e) {
                promise.reject("Error adding team member", e);
            }
        }).start();
    }

    // Example of querying all teams
    @ReactMethod
    public void getAllTeams(Promise promise) {
        new Thread(() -> {
            try {
                List<Team> teams = db.team().getAll();
                Type listType = new TypeToken<List<Team>>() {}.getType();
                String json = gson.toJson(teams, listType); // Convert list to JSON
                promise.resolve(json); // Return JSON string to JS
            } catch (Exception e) {
                promise.reject("Error fetching teams", e);
            }
        }).start();
    }

    @ReactMethod
    public void deleteTeam(int teamId, Promise promise) {
        new Thread(() -> {
            try {
                // Implement the logic to delete the team member from the database
                db.team().deleteById(teamId);
                promise.resolve("Team deleted successfully");
            } catch (Exception e) {
                promise.reject("Error deleting team", e);
            }
        }).start();
    }

    @ReactMethod
    public void checkExists(String userInfo, String teamName, Promise promise) {
        new Thread(() -> {
            try {
                boolean exists = db.team().exists(userInfo, teamName);
                promise.resolve(exists);
            } catch (Exception e) {
                promise.reject("Error checking if exists", e);
            }
        }).start();
    }
}
