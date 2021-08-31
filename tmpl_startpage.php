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

			// select pages by template
			if( 'news' == get_post_type() ) : 
				get_template_part( 'template-parts/content', 'tmpl-news' ); // select posts by post type
			elseif( 'tmpl-collaborations_multiple' === $templateName || 'tmpl-archive_multiple' === $templateName ) :
				get_template_part( 'template-parts/content', $templateName ); // choose specific template
			else : 
				get_template_part( 'template-parts/content', 'tmpl-chapter' ); // choose standard template
			endif;
			

		endwhile; // End of the loop.
		?>

	<?php 
		// global media player
		echo do_shortcode( '[audio src="http://minosoil.jp/wp/wp-content/uploads/2021/05/2105013-minosoil_1Material.wav"]' ) 
	?>		

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
