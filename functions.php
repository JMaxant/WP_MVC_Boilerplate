<?php

/**
 * Define this prefix as needed for the current project : it's used to autoload the custom classes
 */

define('THEME_PREFIX', 'WP_');
define(THEME_PREFIX.'_VERSION','1.0.0');

// Custom functions go there
    // Allows the creation and use of custom classes for templates
function autoloadCustomClasses($class) {
    if(strstr($class, THEME_PREFIX)) {
        require_once 'classes/'.$class.'.php';
    }
}
spl_autoload_register('autoloadCustomClasses');