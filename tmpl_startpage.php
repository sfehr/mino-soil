<?php
/**
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Mino_Soil
 */
get_header( 'ms' );
?>

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			$templateName = basename( get_page_template(), '.php' ); 

			if( 'tmpl-collaborations_multiple' === $templateName || 'tmpl-news' === $templateName ) :
				get_template_part( 'template-parts/content', $templateName ); // choose specific template
			else : 
				get_template_part( 'template-parts/content', 'tmpl-chapter' ); // choose standard template
			endif;
			

		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
