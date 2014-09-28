'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Artworks = new Module('artworks');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Artworks.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Artworks.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Artworks.menus.add({
    title: 'artworks example page',
    link: 'artworks example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Artworks.aggregateAsset('css', 'artworks.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Artworks.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Artworks.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Artworks.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Artworks;
});
