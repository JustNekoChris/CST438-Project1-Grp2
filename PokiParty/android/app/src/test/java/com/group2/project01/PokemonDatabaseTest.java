package com.group2.project01;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import android.content.Context;
import androidx.room.Room;
import androidx.test.core.app.ApplicationProvider;

import com.group02.project01.Pokemon;
import com.group02.project01.PokemonDAO;
import com.group02.project01.PokiPartyDatabase;
import com.group02.project01.Team;
import com.group02.project01.TeamDAO;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import java.util.List;

@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE)
public class PokemonDatabaseTest {

    private PokiPartyDatabase db;
    private PokemonDAO pokemonDao;
    private TeamDAO teamDao;

    @Before
    public void setUp() {
        // Use an in-memory database to avoid persistence across tests
        Context context = ApplicationProvider.getApplicationContext();
        db = Room.inMemoryDatabaseBuilder(context, PokiPartyDatabase.class)
                .allowMainThreadQueries().build();
        pokemonDao = db.pokemon();
        teamDao = db.team();

    }

    @After
    public void tearDown() {
        // Close the database after each test
        db.close();
    }


    // This tests that pokemon are inserted correctly and it returns the correct information.
    @Test
    public void testInsertAndRetrievePokemon() {
        // Create a Pokemon object and insert it into the database
        Pokemon pikachu = new Pokemon("JohnDoe@gmail.com", 25.0, "pikachu", "https://example.com/sprites/pokemon/25.png");
        pokemonDao.add(pikachu);

        // Retrieve all Pokémon and assert that the data is correct
        List<Pokemon> pokemonList = pokemonDao.getAll();

        assertEquals(1, pokemonList.size());
        assertEquals("pikachu", pokemonList.get(0).getPokeName());
        assertEquals("https://example.com/sprites/pokemon/25.png", pokemonList.get(0).getImageURL());
        assertEquals(25.0, pokemonList.get(0).getPokeID(), 0.0);
        assertEquals("JohnDoe@gmail.com", pokemonList.get(0).getUserInfo());

        Pokemon squirtle = new Pokemon("JohnDoe@gmail.com", 12.0, "squirtle", "https://example.com/sprites/pokemon/12.png");
        pokemonDao.add(squirtle);

        pokemonList = pokemonDao.getAll();
        assertEquals(2, pokemonList.size());

        assertEquals("JohnDoe@gmail.com", pokemonList.get(0).getUserInfo());
        assertEquals(25.0, pokemonList.get(0).getPokeID(), 0.0);
        assertEquals("pikachu", pokemonList.get(0).getPokeName());
        assertEquals("https://example.com/sprites/pokemon/25.png", pokemonList.get(0).getImageURL());

        assertEquals("JohnDoe@gmail.com", pokemonList.get(1).getUserInfo());
        assertEquals(12.0, pokemonList.get(1).getPokeID(), 0.0);
        assertEquals("squirtle", pokemonList.get(1).getPokeName());
        assertEquals("https://example.com/sprites/pokemon/12.png", pokemonList.get(1).getImageURL());
    }


    // This tests the native delete function that compares the unique ID that we would probably never touch
    @Test
    public void testDeletePokemon() {
        // Create a Pokemon object and insert it into the database
        Pokemon pikachu = new Pokemon("JohnDoe@gmail.com", 25.0, "pikachu", "https://example.com/sprites/pokemon/25.png");
        Pokemon squirtle = new Pokemon("JohnDoe@gmail.com", 12.0, "squirtle", "https://example.com/sprites/pokemon/12.png");
        pokemonDao.add(pikachu);
        pokemonDao.add(squirtle);

        List<Pokemon> pokemonList = pokemonDao.getAll();
        assertEquals(2, pokemonList.size());

        pokemonDao.delete(pokemonList.get(0));
        pokemonList = pokemonDao.getAll();
        assertEquals(1, pokemonList.size());

        pokemonDao.delete(pokemonList.get(0));
        pokemonList = pokemonDao.getAll();
        assertEquals(0, pokemonList.size());
    }

    // This tests the delete by pokeID and userInfo function that deletes a pokemon based on the pokeID and userInfo
    @Test
    public void testDeletePokemonByPokeIDAndUserInfo() {
        Pokemon pikachu = new Pokemon("JohnDoe@gmail.com", 25.0, "pikachu", "https://example.com/sprites/pokemon/25.png");
        Pokemon squirtle = new Pokemon("JohnDoe@gmail.com", 12.0, "squirtle", "https://example.com/sprites/pokemon/12.png");
        pokemonDao.add(pikachu);
        pokemonDao.add(squirtle);

        List<Pokemon> pokemonList = pokemonDao.getAll();
        assertEquals(2, pokemonList.size());

        pokemonDao.deleteByPokeIDAndUserInfo("JohnDoe@gmail.com", 25.0);
        pokemonList = pokemonDao.getAll();
        assertEquals(1, pokemonList.size());

        pokemonDao.deleteByPokeIDAndUserInfo("JohnDoe@gmail.com", 12.0);
        pokemonList = pokemonDao.getAll();
        assertEquals(0, pokemonList.size());
    };


    // This tests the get by userInfo function that returns pokemon based on the userInfo
    @Test
    public void testGetPokemonByUserInfo() {
        Pokemon pikachu = new Pokemon("JohnDoe@gmail.com", 25.0, "pikachu", "https://example.com/sprites/pokemon/25.png");
        Pokemon squirtle = new Pokemon("Janether@icloud.com", 12.0, "squirtle", "https://example.com/sprites/pokemon/12.png");
        pokemonDao.add(pikachu);
        pokemonDao.add(squirtle);

        List<Pokemon> pokemonList = pokemonDao.getAllByUserInfo("JohnDoe@gmail.com");

        assertEquals(1, pokemonList.size());
        assertEquals("pikachu", pokemonList.get(0).getPokeName());

        pokemonList = pokemonDao.getAllByUserInfo("Janether@icloud.com");

        assertEquals(1, pokemonList.size());
        assertEquals("squirtle", pokemonList.get(0).getPokeName());
    };

    // This tests the exists function that checks if a pokemon with the given userInfo and pokeID exists
    @Test
    public void testPokemonExists() {
        Pokemon pikachu = new Pokemon("JohnDoe@gmail.com", 25.0, "pikachu", "https://example.com/sprites/pokemon/25.png");
        pokemonDao.add(pikachu);

        assertTrue(pokemonDao.exists("JohnDoe@gmail.com", 25.0));
        assertFalse(pokemonDao.exists("squirtle", 12.0));
    };

    
    // This tests making a team and getting all the team objects
    @Test
    public void testInsertAndRetrieveTeam() {
        // Create a Team object and insert it into the database
        Team team = new Team("JohnDoe@gmail.com", "Cool Team");
        teamDao.add(team);

        // Retrieve all Teams and assert that the data is correct
        List<Team> teamList = teamDao.getAll();
        assertEquals(1, teamList.size());
        assertEquals("Cool Team", teamList.get(0).getTeamName());
        assertEquals("JohnDoe@gmail.com", teamList.get(0).getUserInfo());
    };


    // This tests the delete function for teams
    @Test
    public void testDeleteTeam() {
        // Create a Team object and insert it into the database
        Team team = new Team("JohnDoe@gmail.com", "Cool Team");
        teamDao.add(team);

        List<Team> teamList = teamDao.getAll();
        assertEquals(1, teamList.size());
        teamDao.delete(teamList.get(0));

        teamList = teamDao.getAll();
        assertEquals(0, teamList.size());
    };

    // This tests the get by userInfo function that returns teams based on the userInfo
    @Test
    public void testGetTeamByUserInfo() {
        Team team = new Team("JohnDoe@gmail.com", "Cool Team");
        Team team2 = new Team("JaneDane@icloud.com", "Cool Team 2");
        teamDao.add(team);
        teamDao.add(team2);

        List<Team> teamList = teamDao.getAllByUserInfo("JohnDoe@gmail.com");
        assertEquals(1, teamList.size());
        assertEquals("Cool Team", teamList.get(0).getTeamName());

        teamList = teamDao.getAllByUserInfo("JaneDane@icloud.com");
        assertEquals(1, teamList.size());
        assertEquals("Cool Team 2", teamList.get(0).getTeamName());
    };


    // This tests the exists function that checks if a team with the given userInfo and teamName exists
    @Test
    public void testTeamExists() {
        Team team = new Team("JohnDoe@gmail.com", "Cool Team");
        teamDao.add(team);

        assertTrue(teamDao.exists("JohnDoe@gmail.com", "Cool Team"));
        assertFalse(teamDao.exists("JaneDane@icloud.com", "Cool Team"));
    };
                             
}
