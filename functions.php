<?php
/**
 * Mino Soil functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Mino_Soil
 */

/*
* ms_get_theme_text_domain() 
* Load CMB2 functions
* ms_modify_wp_query()
* ms_choose_template()
* ms_big_image_size_threshold()
* ms_output_file_list()
* ms_render_svg()
* ms_get_kses_extended_ruleset()
* ms_custom_menu_link_attributes()
* ms_custom_attachment_image_attributes()
* ms_custom_img_sizes()
*/


if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'mino_soil_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function mino_soil_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Mino Soil, use a find and replace
		 * to change 'mino_soil' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'mino_soil', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'mino_soil' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'mino_soil_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'mino_soil_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function mino_soil_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'mino_soil_content_width', 640 );
}
add_action( 'after_setup_theme', 'mino_soil_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function mino_soil_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'mino_soil' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'mino_soil' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'mino_soil_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function mino_soil_scripts() {
	wp_enqueue_style( 'mino_soil-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'mino_soil-style', 'rtl', 'replace' );

	wp_enqueue_script( 'mino_soil-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	
	// smooth scroll polyfill for safari
//	wp_enqueue_script( 'smooth-scroll-polyfill', get_template_directory_uri() . '/js/smooth-scroll-polyfill.js', array(), _S_VERSION, true );

	// main JS
	wp_enqueue_script( 'ms-scripts', get_template_directory_uri() . '/js/ms-scripts.js', array(), _S_VERSION, true );

}
add_action( 'wp_enqueue_scripts', 'mino_soil_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}




/** SF:
 * Retrieve the text domain of the theme.
 *
 * @since     1.0.0
 * @return    string    The text domain of the plugin.
 */
function ms_get_theme_text_domain() {
	$textdomain = 'mino_soil';
	return $textdomain;
}



/** SF:
 * Load CMB2 functions
 */
require_once( get_template_directory() . '/inc/ms-cmb2-functions.php');



/** SF:
 * Modifying the initial WP query with pre_get_posts hook
 */
function ms_modify_wp_query( $query ) {

	if( $query->is_main_query() && is_home() ){	
		
		// VARS
		$post_types = array( 'post', 'page' );
		
		// QUERY SET
		$query->set( 'post_type', $post_types );
		$query->set( 'posts_per_page', -1 );
		
	}
}
add_action( 'pre_get_posts', 'ms_modify_wp_query' );



/** SF:
 * Chose a custom template 
 */
function ms_choose_template( $template ) {
	
	if ( is_admin() ) {
		return $template;
	}
	
	// HOME
	if ( is_home() && is_main_query() ) {
		$new_template = locate_template( array( 'tmpl_startpage.php' ) );
		if ( !empty( $new_template ) ) {
			return $new_template;
		}
	}

	return $template;
}
add_filter( 'template_include', 'ms_choose_template', 99 );



/** SF:
 * Increase image file size for uploading to media library
 */
function ms_big_image_size_threshold( $threshold ) {
    return 3500; // new threshold
}
add_filter( 'big_image_size_threshold', 'ms_big_image_size_threshold', 999, 1 );



/** SF:
 * Get custom field: file_list
 *
 * @param  string  $file_list_meta_id The field meta id. ('wiki_test_file_list')
 * @param  string  $img_size           Size of image to show
 */
function ms_output_file_list( $file_list_meta_id, $img_size = '' ) {

	// Get the list of files
	$files = get_post_meta( get_the_ID(), $file_list_meta_id, 1 );
	$data = '';
	$media = array();

	// early escape
	if( empty( $files ) ){
		return;
	}

	// Loop through them and output an image
	foreach ( (array) $files as $attachment_id => $attachment_url ) {
		$openTag = '<div class="entry-media itm-img">';
		$closeTag = '</div>';
		$media[] = $openTag . wp_get_attachment_image( $attachment_id, $img_size ) . $closeTag;
	}

	$data =  '<div class="entry-wrapper">' . implode( '', $media ) . '</div>';
	return $data;
}



/** SF:
 * Render SVG code
 *
 * @param  string  $path the URL of the SVG file
 * 
 */
function ms_render_svg( $path ) {
	
	$svg_data = file_get_contents( $path );
	return $svg_data;

}



/** SF:
 * WP kses rule set (args) for savely outputting data like svg code. 
 * The below is a whitelist of attributes.
 *
 * 
 */
function ms_get_kses_extended_ruleset() {

    $kses_defaults = wp_kses_allowed_html( 'post' );

    $svg_args = array(
        'svg'   => array(
            'class'           => true,
			'id'			  => true,
            'aria-hidden'     => true,
            'aria-labelledby' => true,
            'role'            => true,
            'xmlns'           => true,
            'width'           => true,
            'height'          => true,
            'viewbox'         => true, // <= Must be lower case!
        ),
        'g'     => array( 'fill' => true ),
        'title' => array( 'title' => true ),
        'path'  => array(
            'd'    => true,
            'fill' => true,
        ),
		'rect'	=> array( 
			'x' 	 => true,
			'y' 	 => true,
			'width'  => true,
			'height' => true,
		),
		'polygon' => array( 
			'points' => true,
		),
    );

    return array_merge( $kses_defaults, $svg_args );
}



/** SF:
 * Customise attributes of a navigation
 *
 * 
 */
function ms_custom_menu_link_attributes( $atts, $item, $args ){
	
	// get values
	$postID = url_to_postid( $atts[ 'href' ] );
	$targetSlug = get_post_field( 'post_name', $postID );
	
	// set the desired attributes:
	$atts[ 'class' ] = 'nav-item';
	$atts[ 'href' ] = '#post-' . $postID;
	$atts[ 'data-title' ] = $targetSlug;
	
	return $atts;
	
}
add_filter( 'nav_menu_link_attributes' , 'ms_custom_menu_link_attributes' , 10 , 3 );



/** SF:
 * Custom WP query
 *
 * 
 */
function ms_custom_wp_query(){

	// ARGS
	$args[ 'post_type' ] = 'collaborator';
	$args[ 'posts_per_page' ] = -1;
	$args[ 'post_status' ] = 'publish';
/*	$args[ 'orderby' ] = 'date';
	$args[ 'order' ] = 'asc'; */
	
	// LOOP
	$ms_query = null;
	$ms_query = new WP_Query( $args );
	
	ob_start();
	if ( $ms_query->have_posts() ) :
	
		while( $ms_query->have_posts() ) : 

			$ms_query->the_post();
	
				// SINGLE ($post_id)
				get_template_part( 'template-parts/content', get_post_type() );

		endwhile;
		wp_reset_postdata();
	
	else :
		get_template_part( 'template-parts/content', 'none' );
	
 	endif;
	$data = ob_get_contents();
	ob_end_clean();

	// RESPONSE
	return $data;
}



/** SF:
 * Custom image tag by filter
 *
 * 
 */
function ms_custom_head( ) { 
	
	// smooth scroll polyfill
	echo'
		<script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>	
	';

	// EN font
	// echo '<link rel="stylesheet" href="https://use.typekit.net/wlv6frg.css">';

	// JP font
	echo '
		<script>
	(function(d) {
		var config = {
		kitId: \'ept0bzo\',
		scriptTimeout: 3000,
		async: true
		},
		h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src=\'https://use.typekit.net/\'+config.kitId+\'.js\';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
	})(document);
	</script>
	';

	// Social Media
	echo '
	<!-- Primary Meta Tags -->
	<meta name="title" content="MINO SOIL">
	<meta name="description" content="">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://minosoil.jp/">
	<meta property="og:title" content="MINO SOIL">
	<meta property="og:description" content="">
	<meta property="og:image" content="http://minosoil.jp/wp/wp-content/uploads/2021/03/ms-og-image.png">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://minosoil.jp/">
	<meta property="twitter:title" content="MINO SOIL">
	<meta property="twitter:description" content="">
	<meta property="twitter:image" content="http://minosoil.jp/wp/wp-content/uploads/2021/03/ms-og-image.png">
	';		

}; 
add_filter( 'wp_head', 'ms_custom_head', 10, 1 ); 



/** SF:
 * Custom image tag by filter
 *
 * 
 */
/*
function ms_custom_attachment_image_attributes( $atts, $attachment, $size ) {

	// get dimensions
	$imgSrc = wp_get_attachment_image_src( $attachment->ID, '' );
	$imgWidth = $imgSrc[ 1 ]; // 1 = width
	$imgHeight = $imgSrc[ 2 ]; // 2 = height
	$isLandscape = ($imgWidth > $imgHeight) ? true : false;
	$imgRatio = $isLandscape ? ($imgWidth / $imgHeight) : ($imgHeight / $imgWidth);

	// set attributes
	$atts[ 'data-ratio' ] = $imgRatio;
	$atts[ 'data-orientation' ] = $isLandscape;

	return $atts;
  }
  add_filter( 'wp_get_attachment_image_attributes', 'ms_custom_attachment_image_attributes', 10, 3 );
  */



/** SF:
 * Custom Image Sizes
 */
function ms_custom_img_sizes() {
	
	update_option( 'medium_large_size_w', 1000 );
	update_option( 'medium_large_size_h', 1000 );

}
add_action( 'after_setup_theme', 'ms_custom_img_sizes' );


