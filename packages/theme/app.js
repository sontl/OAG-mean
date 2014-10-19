'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Theme = new Module('theme');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Theme.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Theme.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
//  Theme.menus.add({
//    title: 'theme example page',
//    link: 'theme example page',
//    roles: ['authenticated'],
//    menu: 'main'
//  });

    /** General Style **/
    Theme.aggregateAsset('css', 'style.css');
    /** Pretty Photo **/
    Theme.aggregateAsset('css', 'prettyPhoto.css');
    /** CSS Animations **/
    Theme.aggregateAsset('css', 'animate.min.css');
    /** Carousel Slider **/
    Theme.aggregateAsset('css', 'owl-carousel.css');
    /** Red theme **/
    Theme.aggregateAsset('css', 'switcher.css');
    Theme.aggregateAsset('css', 'red.css');
    /** File Upload **/
    Theme.aggregateAsset('css', 'file-upload.css');
    /** ng-tags Input **/
    Theme.aggregateAsset('css', 'ng-tags-input.min.css');
    /** SLIDER ROYAL CSS SETTINGS **/
    Theme.aggregateAsset('css', 'royalslider.css');
    Theme.aggregateAsset('css', 'rs-default-inverted.css');
    Theme.aggregateAsset('js', 'jquery.easing-1.3.js');
    Theme.aggregateAsset('js', 'angular-loadscript.js');
    Theme.aggregateAsset('js', 'jquery.royalslider.min.js');
    /** SLIDER REVOLUTION 4.x CSS SETTINGS **/
    Theme.aggregateAsset('css', 'settings.css');
    Theme.aggregateAsset('js', 'jquery.themepunch.plugins.min.js');
    Theme.aggregateAsset('js', 'jquery.themepunch.revolution.min.js');
    /** Add JS libs **/
    Theme.aggregateAsset('js', 'owl.carousel.min.js');
    Theme.aggregateAsset('js', 'jquery.parallax-1.1.3.js');
    Theme.aggregateAsset('js', 'jquery.simple-text-rotator.js');
    Theme.aggregateAsset('js', 'wow.min.js');
    Theme.aggregateAsset('js', 'jquery.isotope.min.js');

    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Theme.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Theme.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Theme.settings(function(err, settings) {
        //you now have the settings object
    });
     */

    return Theme;
});
