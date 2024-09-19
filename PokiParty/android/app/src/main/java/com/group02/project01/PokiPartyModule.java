package com.group02.project01;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.lang.Exception;
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

    @ReactMethod
    public void insertNewTeam(String userInfo, String teamName, Promise promise) {
        new Thread(() -> {
            try {
                Team team = new Team(userInfo, teamName);
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
                promise.resolve(returnCode);
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
    
    /**
     * Returns all teams based on userInfo
     * @param promise
     */
    @ReactMethod
    public void getAllTeamsByUserInfo(String userInfo, Promise promise) {
        new Thread(() -> {
            try {
                List<Team> teams = db.team().getAllByUserInfo(userInfo);
                Type listType = new TypeToken<List<Team>>() {}.getType();
                String json = gson.toJson(teams, listType); // Convert list to JSON
                promise.resolve(json); // Return JSON string to JS
            } catch (Exception e) {
                promise.reject("Error fetching teams", e);
            }
        }).start();
    }

    // method to delete a team member
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

    // Method to check if a team exists for a specific user
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

    // Method to get all pokemon
    @ReactMethod
    public void getAllPokemon(Promise promise) {
        new Thread(() -> {
            try {
                List<Pokemon> pokemons = db.pokemon().getAll();
                Type listTypePokemon = new TypeToken<List<Pokemon>>() {}.getType();
                String json = gson.toJson(pokemons, listTypePokemon); // Convert list to JSON
                promise.resolve(json); // Return JSON string to JS
            } catch (Exception e) {
                promise.reject("Error fetching pokemons", e);
            }
        }).start();
    }

    // Method to get all Pokemon by user info
    @ReactMethod
    public void getPokemonByUserInfo(String userInfo, Promise promise) {
        new Thread(() -> {
            try {
                System.out.println(userInfo);
                List<Pokemon> pokemon = db.pokemon().getAllByUserInfo(userInfo);
                Type listTypePokemon = new TypeToken<List<Pokemon>>() {}.getType();
                String json = gson.toJson(pokemon, listTypePokemon); // Convert list to JSON
                promise.resolve(json); // Return JSON string to JS
            } catch (Exception e) {
                promise.reject("Error fetching teams", e);
            }
        }).start();
    }

    // Method to check if a pokemon with userInfo and pokeID exists
    @ReactMethod
    public void checkExistspokemon(String userInfo, Double pokeID, Promise promise) {
        new Thread(() -> {
            try {
                boolean exists = db.pokemon().exists(userInfo, pokeID);
                promise.resolve(exists);
            } catch (Exception e) {
                promise.reject("Error checking if exists", e);
            }
        }).start();
    }

    // Method to insert a pokemon
    @ReactMethod
    public void insertPokemon(String userInfo, Double pokeID, String pokeName, String imageURL, Promise promise) {
        new Thread(() -> {
            try {
                Pokemon pokemon = new Pokemon(userInfo, pokeID, pokeName, imageURL);
                db.pokemon().add(pokemon);
                promise.resolve("Pokemon inserted successfully");
            } catch (Exception e) {
                promise.reject("Error inserting pokemon", e);
            }
        }).start();
    }

    // Method to delete a pokemon
    @ReactMethod
    public void deletePokemon(String userInfo, Double pokemonId, Promise promise) {
        new Thread(() -> {
            try {
                db.pokemon().deleteByPokeIDAndUserInfo(userInfo, pokemonId);
                promise.resolve("Pokemon deleted successfully");
            } catch (Exception e) {
                promise.reject("Error deleting pokemon", e);
            }
        }).start();
    }
}
