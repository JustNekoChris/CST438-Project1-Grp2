import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "word_table")
public class Word {

    @PrimaryKey (autoGenerate = true)
    private int id;

    @NonNull
    @ColumnInfo(name = "word")
    private String mWord;

    private Word(@NonNull String word) {this.mWord = word;}

    private String getWord(){return this.mWord;}

}
