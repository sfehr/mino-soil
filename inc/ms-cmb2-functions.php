<?php
/**
 * Include and setup custom metaboxes and fields. (make sure you copy this file to outside the CMB2 directory)
 *
 * Be sure to replace all instances of 'yourprefix_' with your project's prefix.
 * http://nacin.com/2010/05/11/in-wordpress-prefix-everything/
 *
 * @package  Mino_Soil
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/CMB2/CMB2
 */


/** SU CMB2 Functions Inventory
 *  
 * ms_images_metabox()
 * ms_svg_metabox()
 * ms_news_metabox()
 *  
 */



 
/* SHOWCASE METABOX
*
* [file_list] images for post
*
*/
add_action( 'cmb2_admin_init', 'ms_images_metabox' );

function ms_images_metabox() {

	// METABOX
	$showcase = new_cmb2_box( array(
		'id'            => 'ms_box_images',
		'title'         => __( 'Images', ms_get_theme_text_domain() ),
		'object_types'  => array( 'post', 'page', 'collaborator' ), // Post type
		// 'show_on'       => array( 'key' => 'id', 'value' => array( tk_get_ID_by_slug( 'section-head' ) ) ),		
		'show_on'       => array( 'key' => 'page-template', 'value' => array( 'tmpl-teaser.php', 'tmpl-chapter.php', 'tmpl-collaborator.php' ) ),
	) );
	
	// IMAGE FIELD
	$showcase->add_field( array(
		'name' => __( 'Image', ms_get_theme_text_domain() ),
		'id'   => 'imgs',
		'type' => 'file_list',
		'preview_size' => 'large', // Default: array( 50, 50 )
		// 'query_args' => array( 'type' => 'image' ), // Only images attachment
		// Optional, override default text strings
		'text' => array(
			'add_upload_files_text' => __( 'Add Image', ms_get_theme_text_domain() ), // default: "Add or Upload Files"
			'remove_image_text' => __( 'Remove Image', ms_get_theme_text_domain() ), // default: "Remove Image"
			'file_text' => __( 'File:', ms_get_theme_text_domain() ), // default: "File:"
			'file_download_text' => __( 'Download:', ms_get_theme_text_domain() ), // default: "Download"
			'remove_text' => __( 'Remove', ms_get_theme_text_domain() ), // default: "Remove"
		),
	) );	
}



/* SVG METABOX
*
* [file_list] SVG files
*
*/
add_action( 'cmb2_admin_init', 'ms_svg_metabox' );

function ms_svg_metabox() {

	// METABOX
	$showcase = new_cmb2_box( array(
		'id'            => 'ms_box_svg',
		'title'         => __( 'SVG Image', ms_get_theme_text_domain() ),
		'object_types'  => array( 'post', 'page' ), // Post type
		//'show_on'       => array( 'key' => 'id', 'value' => array( tk_get_ID_by_slug( 'section-head' ) ) ),
		'show_on'       => array( 'key' => 'page-template', 'value' => array( 'tmpl-chapter.php', 'tmpl-home.php' ) ),
	) );
	
	// IMAGE FIELD
	$showcase->add_field( array(
		'name' => __( 'SVG file', ms_get_theme_text_domain() ),
		'id'   => 'svg',
		'type' => 'file_list',
		'preview_size' => 'large', // Default: array( 50, 50 )
		'query_args' => array( 'type' => 'image/svg+xml' ), // Only images attachment
		// Optional, override default text strings
		'text' => array(
			'add_upload_files_text' => __( 'Add Image', ms_get_theme_text_domain() ), // default: "Add or Upload Files"
			'remove_image_text' => __( 'Remove Image', ms_get_theme_text_domain() ), // default: "Remove Image"
			'file_text' => __( 'File:', ms_get_theme_text_domain() ), // default: "File:"
			'file_download_text' => __( 'Download:', ms_get_theme_text_domain() ), // default: "Download"
			'remove_text' => __( 'Remove', ms_get_theme_text_domain() ), // default: "Remove"
		),
	) );
	
	//
}



/* NEWS METABOX
*
* [checkbox] visibility
*
*/
add_action( 'cmb2_admin_init', 'ms_news_metabox' );

function ms_news_metabox() {

	// METABOX
	$news = new_cmb2_box( array(
		'id'            => 'ms_news_box',
		'title'         => __( 'Visibility Options', ms_get_theme_text_domain() ),
		'object_types'  => array( 'post', 'page' ), // Post type
		'show_on'       => array( 'key' => 'page-template', 'value' => array( 'tmpl-news.php' ) ),
	) );
	
	// CHECKBOX FIELD
	$news->add_field( array(
		'desc' => __( 'Show or hide this news post', ms_get_theme_text_domain() ),
		'id'   => 'visibility',
		'type' => 'checkbox',
	) );
}	 