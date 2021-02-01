<?php
if(!function_exists('userlist_view')){
    function userlist_view(){
        get_header();
	?>
        <div id="wp-userlist-page"></div>
	<?php
        get_footer();
    }
}else{
    die("<h2>".__('Failed to load User list view','test-test')."</h2>");
}
?>