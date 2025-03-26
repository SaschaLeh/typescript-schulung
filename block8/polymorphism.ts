// Polymorphism in TypeScript

// Base class
class Media {
    constructor(
        public title: string,
        public year: number
    ) {}
    
    play(): void {
        console.log(`Playing: ${this.title} (${this.year})`);
    }
    
    getInfo(): string {
        return `${this.title} (${this.year})`;
    }
}

// Derived classes
class Movie extends Media {
    constructor(
        title: string,
        year: number,
        public director: string,
        public durationMinutes: number
    ) {
        super(title, year);
    }
    
    // Override play method
    play(): void {
        console.log(`Playing movie: ${this.title} directed by ${this.director}`);
    }
    
    // Override getInfo method
    getInfo(): string {
        return `Movie: ${super.getInfo()}, Director: ${this.director}, Duration: ${this.durationMinutes} min`;
    }
}

class Song extends Media {
    constructor(
        title: string,
        year: number,
        public artist: string,
        public durationSeconds: number
    ) {
        super(title, year);
    }
    
    // Override play method
    play(): void {
        console.log(`Playing song: ${this.title} by ${this.artist}`);
    }
    
    // Override getInfo method
    getInfo(): string {
        const minutes = Math.floor(this.durationSeconds / 60);
        const seconds = this.durationSeconds % 60;
        return `Song: ${super.getInfo()}, Artist: ${this.artist}, Duration: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

class VideoGame extends Media {
    constructor(
        title: string,
        year: number,
        public studio: string,
        public platforms: string[]
    ) {
        super(title, year);
    }
    
    // Override play method
    play(): void {
        console.log(`Playing game: ${this.title} by ${this.studio}`);
    }
    
    // Override getInfo method
    getInfo(): string {
        return `Game: ${super.getInfo()}, Studio: ${this.studio}, Platforms: ${this.platforms.join(', ')}`;
    }
}

// 1. Basic Polymorphism - Function accepts base type
function playMedia(media: Media): void {
    console.log("---- Media Player ----");
    media.play();
    console.log(media.getInfo());
    console.log("---------------------");
}

// Create instances of each type
const movie = new Movie("Inception", 2010, "Christopher Nolan", 148);
const song = new Song("Bohemian Rhapsody", 1975, "Queen", 355);
const game = new VideoGame("The Last of Us", 2013, "Naughty Dog", ["PlayStation"]);

// Polymorphic function calls
console.log("Polymorphism with function parameter:");
playMedia(movie);
playMedia(song);
playMedia(game);

// 2. Array of base type with polymorphic behavior
const mediaLibrary: Media[] = [
    new Movie("The Shawshank Redemption", 1994, "Frank Darabont", 142),
    new Song("Imagine", 1971, "John Lennon", 183),
    new VideoGame("Minecraft", 2011, "Mojang", ["PC", "Console", "Mobile"]),
    new Movie("The Godfather", 1972, "Francis Ford Coppola", 175),
    new Song("Billie Jean", 1983, "Michael Jackson", 294)
];

console.log("\nPolymorphism with array of base type:");
console.log("Media Library Contents:");
for (const item of mediaLibrary) {
    console.log(`- ${item.getInfo()}`);
}

console.log("\nPlaying all media:");
mediaLibrary.forEach(item => item.play());

// 3. Type checking and casting
function processMediaItem(item: Media): void {
    console.log("\nProcessing media item:");
    
    // Using instanceof for runtime type checking
    if (item instanceof Movie) {
        // TypeScript knows item is a Movie within this block
        console.log(`Movie-specific info: Director ${item.director}`);
        console.log(`Runtime: ${item.durationMinutes} minutes`);
    } 
    else if (item instanceof Song) {
        // TypeScript knows item is a Song within this block
        console.log(`Song-specific info: Artist ${item.artist}`);
        const minutes = Math.floor(item.durationSeconds / 60);
        const seconds = item.durationSeconds % 60;
        console.log(`Duration: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    } 
    else if (item instanceof VideoGame) {
        // TypeScript knows item is a VideoGame within this block
        console.log(`Game-specific info: Studio ${item.studio}`);
        console.log(`Available on: ${item.platforms.join(', ')}`);
    } 
    else {
        // Just a generic Media object
        console.log(`Generic media info: ${item.getInfo()}`);
    }
}

// Test the type checking function
processMediaItem(movie);
processMediaItem(song);
processMediaItem(game);

// 4. Type assertion (casting) example
// Sometimes you might need to manually cast when TypeScript can't infer
function handleSongRequest(mediaId: number, mediaLibrary: Media[]): void {
    const media = mediaLibrary[mediaId];
    
    try {
        // We're asserting that this media is a Song
        const song = media as Song;
        console.log(`\nNow playing song: ${song.title} by ${song.artist}`);
        
        // This will cause a runtime error if media is not a Song
        const duration = `${Math.floor(song.durationSeconds / 60)}:${(song.durationSeconds % 60).toString().padStart(2, '0')}`;
        console.log(`Duration: ${duration}`);
    } catch (error) {
        console.error("Error: The selected media is not a song!");
    }
}

// This will work (index 1 is a Song)
handleSongRequest(1, mediaLibrary);

// This would cause a runtime error (index 0 is a Movie)
// handleSongRequest(0, mediaLibrary);

// 5. Double dispatch pattern example
interface MediaVisitor {
    visitMovie(movie: Movie): void;
    visitSong(song: Song): void;
    visitVideoGame(game: VideoGame): void;
}

// Adding accept method to base class
class EnhancedMedia extends Media {
    accept(visitor: MediaVisitor): void {
        // Base implementation does nothing
    }
}

// Override in derived classes
class EnhancedMovie extends Movie {
    accept(visitor: MediaVisitor): void {
        visitor.visitMovie(this);
    }
}

class EnhancedSong extends Song {
    accept(visitor: MediaVisitor): void {
        visitor.visitSong(this);
    }
}

class EnhancedVideoGame extends VideoGame {
    accept(visitor: MediaVisitor): void {
        visitor.visitVideoGame(this);
    }
}

// Example visitor implementation
class MediaPrinter implements MediaVisitor {
    visitMovie(movie: Movie): void {
        console.log(`MOVIE: ${movie.title} (${movie.year}) - Directed by ${movie.director}`);
    }
    
    visitSong(song: Song): void {
        console.log(`SONG: ${song.title} (${song.year}) - By ${song.artist}`);
    }
    
    visitVideoGame(game: VideoGame): void {
        console.log(`GAME: ${game.title} (${game.year}) - By ${game.studio} for ${game.platforms.join('/')}`);
    }
}

// Using the visitor pattern
console.log("\nVisitor pattern (double dispatch):");
const printer = new MediaPrinter();

const enhancedMovie = new EnhancedMovie("Interstellar", 2014, "Christopher Nolan", 169);
const enhancedSong = new EnhancedSong("Yesterday", 1965, "The Beatles", 125);
const enhancedGame = new EnhancedVideoGame("The Witcher 3", 2015, "CD Projekt Red", ["PC", "PlayStation", "Xbox"]);

enhancedMovie.accept(printer);
enhancedSong.accept(printer);
enhancedGame.accept(printer); 