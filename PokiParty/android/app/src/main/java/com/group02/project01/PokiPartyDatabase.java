package com.group02.project01;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

@Database(entities = {Team.class, Pokemon.class}, version = 4, exportSchema = false)
public abstract class PokiPartyDatabase extends RoomDatabase {
    public abstract TeamDAO team();
    public abstract PokemonDAO pokemon();

    private static PokiPartyDatabase sInstance;

    public static synchronized PokiPartyDatabase getInstance(Context context) {
        if (sInstance == null) {
            sInstance = Room.databaseBuilder(context.getApplicationContext(),
                    PokiPartyDatabase.class, "PokiParty.db")
                    .fallbackToDestructiveMigration()
                    .allowMainThreadQueries().build();
        }
        return sInstance;
    }

}
