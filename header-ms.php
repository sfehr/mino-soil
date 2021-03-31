<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Mino_Soil
 */

 $siteLogoPath = get_template_directory() . '/assets/ms-logo-symbol.svg';
 $uiArrowPath = get_template_directory() . '/assets/ms-icon-arrow.svg';
 //$uiTextPath = get_template_directory() . '/assets/ms-icon-text.svg';
 //$uiImagesPath = get_template_directory() . '/assets/ms-icon-images.svg';
 $siteLogo = ms_render_svg( $siteLogoPath );
 $uiArrow = ms_render_svg( $uiArrowPath );
 //$uiText = ms_render_svg( $uiTextPath );
 //$uiImages = ms_render_svg( $uiImagesPath );

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'mino_soil' ); ?></a>

	<div class="ui-layer" >
		<div id="ui-title" class="ui"></div><!-- #ui-title -->

		<div id="ui-panel-left" class="ui">
			<div class="ui-item arrow up"><?php echo wp_kses( $uiArrow, ms_get_kses_extended_ruleset() ); ?></div>
			<div class="ui-item arrow down"><?php echo wp_kses( $uiArrow, ms_get_kses_extended_ruleset() ); ?></div>
		</div><!-- #ui-panel-left -->

		<div id="ui-panel-right" class="ui">
			<div class="ui-item arrow left"><?php echo wp_kses( $uiArrow, ms_get_kses_extended_ruleset() ); ?></div>
			<div class="ui-item arrow right"><?php echo wp_kses( $uiArrow, ms_get_kses_extended_ruleset() ); ?></div>
		</div><!-- #ui-panel-right -->
	</div><!-- .ui-layer -->

	<header id="masthead" class="site-header">
		<div class="site-branding">

			<div id="site-logo">
				<?php echo wp_kses( $siteLogo, ms_get_kses_extended_ruleset() ); ?>
			</div><!-- #site-logo -->
			<?php

			if ( is_front_page() && is_home() ) :
				?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
			else :
				?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php
			endif;
			$mino_soil_description = get_bloginfo( 'description', 'display' );
			if ( $mino_soil_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php echo $mino_soil_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
			<?php endif; ?>
		</div><!-- .site-branding -->

		<nav id="site-navigation" class="main-navigation">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'mino_soil' ); ?></button>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
				)
			);
			?>
		</nav><!-- #site-navigation -->
		<nav id="ms-language" >
			<ul>
				<?php
				// pll functions must be checked for existance
				 if( function_exists ( 'pll_the_languages' ) ){
					 pll_the_languages();
				 }
				 ?>
			</ul>
		</nav><!-- #ms-language -->
	</header><!-- #masthead -->
