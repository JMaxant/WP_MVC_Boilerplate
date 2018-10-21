<?php
/*
 * Template Name: Index
 */
get_header();
$index = new WP_Index;
?>

<h1 class="coucou">Hi there!</h1>
<?= $index->content; ?>
<?php get_footer(); ?>

