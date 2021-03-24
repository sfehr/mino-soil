<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Mino_Soil
 */

$mediaImages = ms_output_file_list( 'imgs', '' );
$templateName = basename( get_page_template(), '.php' );

// for home section only
if( $templateName === 'tmpl-home' ) : 
	$siteLogoTypePath = get_template_directory() . '/assets/ms-logo-type.svg';
	$siteLogoType = ms_render_svg( $siteLogoTypePath );	
endif;
?>

<section id="post-<?php the_ID(); ?>" <?php post_class( 'section main ' . $templateName ); ?> data-title="<?php echo get_post_field( 'post_name', get_the_ID() ); ?>">

	<?php
	// home only
	if( $templateName === 'tmpl-home' ) : ?>
		<div id="home-logo" class="container-svg">
			<?php echo wp_kses( $siteLogoType, ms_get_kses_extended_ruleset() ) ?>
		</div>
	<?php endif; ?>	

	<?php 
	// print this block only when images are set
	if( !empty( $mediaImages ) ) : 
	?>
		<section class="section sub container-media">
			
			<?php echo $mediaImages ?>

			<?php 
			// for tmpl-chapter only
			if( $templateName === 'tmpl-chapter' ) : 
			?>
			<div class="ui-area"></div>
			<?php endif; ?>


		</section>
	<?php endif; ?>

	<section class="section sub container-text">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>		
		<div class="entry-content">
				<?php
				the_content(
					sprintf(
						wp_kses(
							/* translators: %s: Name of current post. Only visible to screen readers */
							__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'mino_soil' ),
							array(
								'span' => array(
									'class' => array(),
								),
							)
						),
						wp_kses_post( get_the_title() )
					)
				);
				?>
		</div>
	</section>

</section><!-- #post-<?php the_ID(); ?> -->
