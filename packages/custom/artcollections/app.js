'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Artcollections = new Module('artcollections');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Artcollections.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Artcollections.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Artcollections.menus.add({
    title: 'artcollections example page',
    link: 'artcollections example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Artcollections.aggregateAsset('css', 'artcollections.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Artcollections.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Artcollections.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Artcollections.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Artcollections;
});
