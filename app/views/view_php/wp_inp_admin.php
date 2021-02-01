<?php
if(!function_exists('admin_settings')){
    function admin_settings(){
	?>
        <div id="wp-admin-settings" data-url="<?php echo site_url();?>"></div>
	<?php
    }
}else{
    die("<h2>".__('Failed to load Admin Settings view','test-test')."</h2>");
}
?>