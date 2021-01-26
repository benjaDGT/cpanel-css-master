<?php
//include 'yelp/config-yelp.php';

add_theme_support('post-thumbnails');
set_post_thumbnail_size(825, 510, true);

function flex_theme_load_initial_css()
{
  wp_register_style('flex_initial_css_main', get_template_directory_uri() . '/css/main.css',false,'1.1','all');
  wp_enqueue_style('flex_initial_css_main');
}
add_action('wp_enqueue_scripts', 'flex_theme_load_initial_css');

//ELIMINANDO EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

function dequeue_gutenberg_theme_css()
{
  wp_dequeue_style('wp-block-library');
}
add_action('wp_enqueue_scripts', 'dequeue_gutenberg_theme_css', 100);

add_filter('wpe_heartbeat_allowed_pages', function ($pages) {
  global $pagenow;
  $pages[] =  $pagenow;
  return $pages;
});
