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

<section id="post-<?php the_ID(); ?>" <?php post_class( 'section main ' . $templateName ); ?> data-title="<?php echo get_post_field( 'post_name', get_the_ID() ); ?>">

	<section class="section sub container-text">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

		<div class="container-archive">
			<?php echo ms_archive_wp_query(); ?>
		</div>		
	</section>

</section><!-- #post-<?php the_ID(); ?> -->
