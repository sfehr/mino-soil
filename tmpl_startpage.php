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

			if( $templateName !== 'tmpl-collaborations_multiple' ) :
				$templateName = 'tmpl-chapter'; // use 1 template for all page/post templates with conditionals
			endif;	

			get_template_part( 'template-parts/content', $templateName ); // choose template part by page/post template

		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
