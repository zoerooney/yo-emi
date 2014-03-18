<?php
/**
 * Single Post Template
 * 
 * Used for displaying single posts from the posts type and any
 * custom post types, unless a CPT single post template is specified.
 *
 * @package <%= themeFunction %>
 */

get_header(); ?>

<section id="primary">

	<?php while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'content', 'single' ); ?>

		<?php comments_template( '', true ); ?>

	<?php endwhile; // end of the loop. ?>

</section><!-- #primary -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>