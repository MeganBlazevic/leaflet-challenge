# leaflet-challenge

This module 5 challenge has us looking at the United States Geological Survey to visual current and ever changing data on the website.  This challenge has 2 seperate parts, part 1 - the required section, and part 2 - the bonus.

### Programs / Skill Sets
- HTML
- JavaScript
- GeoJSON 
- Leaflet


## Part 1 | Create the Earthquake Visualization (Required)
We are asked to visualize the eqarthquake data sete provided by the USGS GeoJSON feed. The data set will need to be imported and visualized by using leaflet to create the map based on location (latitude and longitute). Each earthquake will be marked on the map by utilizing varing colors and marker seixes to show the size and magnitude of each earthquake.  Creating pop-ups to show additional information when the markers is clicked. 

We got to choose the dataset from the United States Geological Survey website. I choose to lok at the data for all earthquakes over the past 7 days. This data set is updated each minute. 

## Part 2 | Gather and Plot More Data (Bonus)
This portion was not completed during the project.  

## Learnings
For this challenge, after obtaining a lot of help (thanks Nick) I learned that in your style.css file you can't have semicolons between your different data sets. I had intially had them in there and I some of the programs we needed them (better safe than sorry, I thought) however, I learned now that unless required in the css file to not have them there. Which when I just tried something, the semicolons may be allowed, and it might have been the height and width for the body.  Regardless, it works now.  

Several times I had the code written, but it wasn't working as it should.  So I thought that I had it correct, but the map wouldn't show.  This was challenging to ensure that the code was correct and that it worked. I tend to either need to do things in really small pieces to ensure that it works (thanks jupyter notebook) or complete it all and hope that the fingers cross. So sometimes I struggle with the console.log options as it can ensure if something is working or not; as you have to ensure that the full loop/code is closed and complete.