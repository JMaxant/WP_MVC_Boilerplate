<?php

/**
 * Define this prefix as needed for the current project : it's used to autoload the custom classes
 */

define('THEME_PREFIX', 'WP_');
define(THEME_PREFIX.'_VERSION','1.0.0');

function header_scripts()
{
    wp_deregister_script('jquery');
    foreach (new DirectoryIterator(get_stylesheet_directory().'/dist/css') as $fileInfo)
    {
        if($fileInfo->isDot()) continue;
        $fullName = $fileInfo->getFilename();
        wp_enqueue_style('styles', get_stylesheet_directory_uri().'/dist/css/'.$fullName);
    }
}
add_action('wp_enqueue_scripts', 'header_scripts');

function footer_scripts()
{
    foreach (new DirectoryIterator(get_stylesheet_directory().'/dist/js') as $fileInfo)
    {
        if ($fileInfo->isDot()) continue;
        $fullName = $fileInfo->getFilename();
        $name = substr(basename($fullName), 0, strpos(basename($fullName), '.'));
        wp_enqueue_script($name, get_stylesheet_directory_uri().'/dist/js/'.$fullName);
    }
}
add_action('wp_footer', 'footer_scripts');
// Custom functions go there
    // Allows the creation and use of custom classes for templates
function autoloadCustomClasses($class) {
    if(strstr($class, THEME_PREFIX)) {
        require_once 'classes/'.$class.'.php';
    }
}
spl_autoload_register('autoloadCustomClasses');