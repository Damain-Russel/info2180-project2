# INFO2180 - Project 2 - The Fifteen Puzzle
I was provided with the HTML (index.html) and CSS (fifteen.css) code to use,
which was not be modified. These files were downloaded to my machine while I wrote the
JavaScript code, which worked with the provided files unmodified. To
modify the page's behavior and content, JavaScript code was written that interacts with the page using
the DOM. To modify its appearance, appropriate DOM code was written to change styles of onscreen
elements by setting classes, IDs, and/or style properties on them. I was allowed to use the
jQuery JavaScript library therefore I downloaded and added it to the project unmodified.

# Directories
created directory for CSS and JavaScript

# Added jquery-3.1.1.min.js
So that I can work freely even if there is no internet

# Appearance Details
In the center of the page is a set of tiles representing the playable Fifteen Puzzle game. Each
tile is 100x100 pixels in total size, including a 2px black border around all four of its sides. (This
leaves 96x96 pixels visible area inside the tile.) Each tile displays a number from 1 to 15 in 32pt
text using the default sans-serif font available on the system. When the page loads, initially the
tiles are arranged in their correct order, top to bottom, left to right, with the missing square in the
bottom-right. The tiles also display a chunk of the image background.jpg, assumed to be located
in the same folder as your page. (A CSS class named puzzlepiece has been created for you
that represents these styles, but nothing on the existing page uses this class. If you want any
onscreen elements to use this class, you'll have to set it using DOM code.)