<?php
namespace App\Controller;

class Wpinp_View_Controller{

	public function __construct(){
		add_filter('query_vars', array( $this, 'wp_test_query_vars' ));
		add_filter('generate_rewrite_rules', array( $this, 'wp_test_rewrite_rules' ));
		//On specified url redirect to template
		add_action( 'template_redirect',array( $this, 'wp_test_user_list' ));
		add_action( 'wp_enqueue_scripts',array( $this, 'wp_test_css_scripts' ));	
	}

	// Rewrite to rule to remove index.php
	public function wp_test_rewrite_rules(){
		global $wp_rewrite;
		$setting = get_option('test_custom_end_point');
		$wp_rewrite->rules = array_merge(
			[$setting['query_var'].'/(\d+)/?$' => 'index.php?'.$setting['query_var'].'='.$setting['custom_point']],
			$wp_rewrite->rules
		);
	}


	//Check for url query and show template
	public function wp_test_user_list(){
		global $wp_query;
		$setting = get_option('test_custom_end_point');
		if(isset($wp_query->query_vars[$setting['query_var']])){
			if($wp_query->query_vars[$setting['query_var']]==$setting['custom_point']){
				require_once(WP_VIEWS_PHP.'wp_inp_userlist_view.php');
				userlist_view();
				exit();			
			}
		}
	}
	
	//Setting Query variable
	public function wp_test_query_vars($vars) {
		$setting = get_option('test_custom_end_point');
		$vars[] = $setting['query_var'];
		return $vars;
	}

	// Add CSS
	public function wp_test_css_scripts(){
		wp_enqueue_style( 'wp-test-front-css', plugins_url( '../assets/css/wp-test-front-css.css' , dirname(__FILE__) ) );
		//Add Builded React JS 
		wp_enqueue_script(
			'wpinp-test-react',
			plugins_url('/views/build/inpfront.js', dirname(__FILE__)),
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

