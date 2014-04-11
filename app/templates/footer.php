<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
* @package <%= themeFunction %>
*/
?>

	</div><!-- #main -->

</div><!-- #page -->

<footer id="colophon" role="contentinfo">
	<div id="site-generator">
		&copy; <?php echo date('Y'); echo '&nbsp;'; echo bloginfo( 'name' ); ?><br>
		Site by <a href="<%= themeDesignerURI %>" target="_blank"><%= themeDesigner %></a> &amp; 
    <a href="<%= themeAuthorURI %>" target="_blank">Development by <%= themeAuthor %></a>
	</div>
</footer><!-- #colophon -->

<?php wp_footer(); ?>
</body>
</html>