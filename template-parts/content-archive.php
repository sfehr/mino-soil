<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Mino_Soil
 */

$templateName = basename( get_page_template(), '.php' );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( $templateName ); ?> data-title="<?php echo get_post_field( 'post_name', get_the_ID() ); ?>">

	<div class="archive-date"><?php echo get_the_date( 'Y / m' ); ?></div>
	<div class="archive-title"><?php echo get_the_title(); ?></div>
	<div class="archive-content"><?php echo get_the_content(); ?></div>

</article><!-- #post-<?php the_ID(); ?> -->
