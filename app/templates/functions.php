<?php
/**
 * <%= themeName %> functions and definitions
 *
 * Sets up the theme and provides some helper functions. Some helper functions
 * are used in the theme as custom template tags. Others are attached to action and
 * filter hooks in WordPress to change core functionality.
 *
 *
 *
 * @package WordPress
 * @subpackage <%= themeFunction %>
 * @since <%= themeName %> 1.0
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) )
	$content_width = 600;

/**
 * Tell WordPress to run <%= themeHandle %>_setup() when the 'after_setup_theme' hook is run.
 */
add_action( 'after_setup_theme', '<%= themeHandle %>_setup' );

if ( ! function_exists( '<%= themeHandle %>_setup' ) ):
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 *
 * To override <%= themeHandle %>_setup() in a child theme, add your own <%= themeHandle %>_setup to your child theme's
 * functions.php file.
 *
 * @uses load_theme_textdomain() For translation/localization support.
 * @uses add_editor_style() To style the visual editor.
 * @uses add_theme_support() To add support for post thumbnails, automatic feed links, and Post Formats.
 * @uses register_nav_menus() To add support for navigation menus.
 * @uses add_custom_background() To add support for a custom background.
 * @uses add_custom_image_header() To add support for a custom header.
 * @uses register_default_headers() To register the default custom header images provided with the theme.
 * @uses set_post_thumbnail_size() To set a custom post thumbnail size.
 *
 * @since <%= themeName %> 1.0
 */
function <%= themeHandle %>_setup() {

	/* Make <%= themeName %> available for translation.
	 * Translations can be added to the /languages/ directory.
	 * If you're building a theme based on <%= themeName %>, use a find and replace
	 * to change '<%= themeHandle %>' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( '<%= themeHandle %>', get_template_directory() . '/languages' );

	$locale = get_locale();
	$locale_file = get_template_directory() . "/languages/$locale.php";
	if ( is_readable( $locale_file ) )
		require_once( $locale_file );

	// Add default posts and comments RSS feed links to <head>.
	add_theme_support( 'automatic-feed-links' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menu( 'primary', __( 'Primary Menu', '<%= themeHandle %>' ) );

	// This theme uses Featured Images (also known as post thumbnails) for per-post/per-page Custom Header images
	add_theme_support( 'post-thumbnails' );

	// Add custom image sizes
	// add_image_size( 'name', 500, 300 );
}
endif; // <%= themeHandle %>_setup


/**
 * Returns a "Continue Reading" link for excerpts
 */
function <%= themeHandle %>_continue_reading_link() {
	return ' <a href="'. esc_url( get_permalink() ) . '">' . __( 'Continue reading <span class="meta-nav">&rarr;</span>', '<%= themeHandle %>' ) . '</a>';
}

/**
 * Replaces "[...]" (appended to automatically generated excerpts) with an ellipsis and <%= themeHandle %>_continue_reading_link().
 *
 */
function <%= themeHandle %>_auto_excerpt_more( $more ) {
	return ' &hellip;' . <%= themeHandle %>_continue_reading_link();
}
add_filter( 'excerpt_more', '<%= themeHandle %>_auto_excerpt_more' );

/**
 * Adds a pretty "Continue Reading" link to custom post excerpts.
 *
 * To override this link in a child theme, remove the filter and add your own
 * function tied to the get_the_excerpt filter hook.
 */
function <%= themeHandle %>_custom_excerpt_more( $output ) {
	if ( has_excerpt() && ! is_attachment() ) {
		$output .= <%= themeHandle %>_continue_reading_link();
	}
	return $output;
}
add_filter( 'get_the_excerpt', '<%= themeHandle %>_custom_excerpt_more' );


/**
 * Register our sidebars and widgetized areas.
 *
 * @since <%= themeName %> 1.0
 */
function <%= themeHandle %>_widgets_init() {

	register_sidebar( array(
		'name' => __( 'Sidebar', '<%= themeHandle %>' ),
		'id' => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => "</aside>",
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
}
add_action( 'widgets_init', '<%= themeHandle %>_widgets_init' );


if ( ! function_exists( '<%= themeHandle %>_comment' ) ) :
/**
 * Template for comments and pingbacks.
 *
 * To override this walker in a child theme without modifying the comments template
 * simply create your own <%= themeHandle %>_comment(), and that function will be used instead.
 *
 * Used as a callback by wp_list_comments() for displaying the comments.
 *
 * @since <%= themeName %> 1.0
 */
function <%= themeHandle %>_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	switch ( $comment->comment_type ) :
		case 'pingback' :
		case 'trackback' :
	?>
	<li class="post pingback">
		<p><?php _e( 'Pingback:', '<%= themeHandle %>' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( __( 'Edit', '<%= themeHandle %>' ), '<span class="edit-link">', '</span>' ); ?></p>
	<?php
			break;
		default :
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
		<article id="comment-<?php comment_ID(); ?>" class="comment">
			<footer class="comment-meta">
				<div class="comment-author vcard">
					<?php
						$avatar_size = 35;
							if ( '0' != $comment->comment_parent )
							$avatar_size = 35;
					
							echo get_avatar( $comment, $avatar_size );
					
						/* translators: 1: comment author, 2: date and time */
						printf( __( '%1$s %2$s', '<%= themeHandle %>' ),
							sprintf( '<span class="fn">%s</span>', get_comment_author_link() ),
							sprintf( '<time pubdate datetime="%2$s">%3$s</time>',
								esc_url( get_comment_link( $comment->comment_ID ) ),
								get_comment_time( 'c' ),
								/* translators: 1: date, 2: time */
								sprintf( __( '%1$s at %2$s', '<%= themeHandle %>' ), get_comment_date(), get_comment_time() )
							)
						);
					?>

				</div><!-- .comment-author .vcard -->

				<?php if ( $comment->comment_approved == '0' ) : ?>
					<em class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', '<%= themeHandle %>' ); ?></em>
					<br />
				<?php endif; ?>

			</footer>

			<div class="comment-content"><?php comment_text(); ?></div>

			<div class="reply">
				<?php comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply', '<%= themeHandle %>' ), 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
			</div><!-- .reply -->
		</article><!-- #comment-## -->
	
	<?php
			break;
	endswitch;
}
endif; // ends check for <%= themeHandle %>_comment()


/**
 * Adds two classes to the array of body classes.
 * The first is if the site has only had one author with published posts.
 * The second is if a singular post being displayed
 *
 * @since <%= themeName %> 1.0
 */
function <%= themeHandle %>_body_classes( $classes ) {

	if ( function_exists( 'is_multi_author' ) && ! is_multi_author() )
		$classes[] = 'single-author';

	if ( is_singular() && ! is_home() && ! is_page_template( 'showcase.php' ) && ! is_page_template( 'sidebar-page.php' ) )
		$classes[] = 'singular';

	return $classes;
}
add_filter( 'body_class', '<%= themeHandle %>_body_classes' );


/**
 * REMOVE ADMIN BAR FOR ALL USERS
 */
show_admin_bar( false );


/**
 * ENQUEUE SCRIPTS
 */
//function <%= themeHandle %>_scripts_method() {
//	wp_enqueue_script(
//		'newscript',
//		get_template_directory_uri() . '/js/newscript.js',
//		array('jquery')
//	);
//}    
// 
//add_action('wp_enqueue_scripts', '<%= themeHandle %>_scripts_method');


/**
 * Add TinyMCE buttons that are disabled by default
 */
//function <%= themeHandle %>_mce_buttons_2($buttons) {	
//	/**
//	 * Add in a core button that's disabled by default
//	 */
//	$buttons[] = 'justify'; // fully justify text
//	$buttons[] = 'hr'; // insert HR
//
//	return $buttons;
//}
//add_filter('mce_buttons_2', '<%= themeHandle %>_mce_buttons_2');


/**
 * Remove all colors except those custom colors specified from TinyMCE
 */
//function <%= themeHandle %>_change_mce_options( $init ) {
//	$init['theme_advanced_text_colors'] = '8dc63f';
//	$init['theme_advanced_more_colors'] = false;
//return $init;
//}
//add_filter('tiny_mce_before_init', '<%= themeHandle %>_change_mce_options');


/**
 * Only show posts in search results
 */
//function <%= themeHandle %>_SearchFilter($query) {
//    if ($query->is_search) {
//        $query->set('post_type', 'post');
//    }
//    return $query;
//}
//add_filter('pre_get_posts','<%= themeHandle %>_SearchFilter');

/**
 * On the fly image resizing
 * docs at https://github.com/sy4mil/Aqua-Resizer/wiki/Examples
 */
// require_once('inc/aq_resizer.php');