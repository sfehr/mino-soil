<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Mino_Soil
 */

if ( get_post_meta( get_the_ID(), 'visibility', 1 ) ) :

	?>
	<div class="ms-news">
		<div>
			<?php echo get_the_content(); ?>
		</div>
	</div>	
	<?php

endif;
?>