<?php
namespace App\Controller;

class Wpinp_Admin_Controller{
	
	public function __construct(){
		
		add_action('admin_menu', array($this, 'wp_test_admin_menu'));
		// Add scripts 
		add_action( 'admin_enqueue_scripts',array( $this, 'wp_test_css_scripts' ));	
	}

	//Admin menu start
	public function wp_test_admin_menu(){
		add_menu_page('test-Setting', 'test', 'manage_options',WPINSP_TYPE, array( $this, 'wp_test_setting'),'dashicons-awards',90);
	}
	
	//Admin side setting page
	public function wp_test_setting(){
		require_once(WP_VIEWS_PHP.'wp_inp_admin.php');
		admin_settings();
	}

	// Add CSS
	public function wp_test_css_scripts(){
		wp_enqueue_style( 'wp-test-css', plugins_url( '../assets/css/wp-test-css.css' , dirname(__FILE__) ) );
		//Add Builded React JS 
		wp_enqueue_script(
			'wpinp-test-react',
			plugins_url('/views/build/test.js', dirname(__FILE__)),
			array('wp-element','wp-i18n'),
			time(), // Change this to null for production
			true
		);

		$query_args = array(
			'family' => 'Open+Sans:400,500,700|Oswald:700|Roboto:300,400,500,700',
			'subset' => 'latin,latin-ext',
		);
		wp_register_style( 'google_fonts', add_query_arg( $query_args, "//fonts.googleapis.com/css" ), array(), null );
		wp_enqueue_style('google_fonts');
	}
}
