<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Mino_Soil
 */

$templateName = basename( get_page_template(), '.php' );
$mediaImages = ms_output_file_list( 'imgs', '' );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( $templateName ); ?> data-title="<?php echo get_post_field( 'post_name', get_the_ID() ); ?>">

	<?php 
	// print this block only when images are set
	if( !empty( $mediaImages ) ) : 
	?>
		<div class="collab-part container-media">
			<?php echo $mediaImages ?>
			<div class="ui-area"></div>
		</div>
	<?php endif; 

	// conditionally change the output depending on the template (post format)
	if( $templateName === 'tmpl-collaborator_title' ) : ?>
		
		<div class="collaborator-title">
			<h2>
				<?php echo wp_strip_all_tags( get_the_content() ); ?>
			</h2>
		</div>

	<?php
	else :
	?>
		<div class="collab-part collab-content">
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
		</div><!-- .collab-content -->
	<?php endif ?>

</article><!-- #post-<?php the_ID(); ?> -->
