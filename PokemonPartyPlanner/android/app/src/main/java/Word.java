import androidx.annotation.NonNull;

public class Word {

    private String word;
    private Word(@NonNull String word) {this.mWord = word;}
    private String getWord(){return this.mWord;}
    
}
