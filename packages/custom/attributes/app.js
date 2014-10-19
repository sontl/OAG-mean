'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Attributes = new Module('attributes');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Attributes.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Attributes.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Attributes.menus.add({
    title: 'attributes example page',
    link: 'attributes example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Attributes.aggregateAsset('css', 'attributes.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Attributes.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Attributes.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Attributes.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Attributes;
});
