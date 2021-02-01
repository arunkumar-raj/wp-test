<?php
namespace App\Controller;

class Wpinp_Rest_Controller{

	public function __construct(){
		add_action( 'rest_api_init', array($this,'wpinp_rest_api_register'));
	}

	//Rest Register
	public function wpinp_rest_api_register(){
		//Get Settings
		$class = new \App\Model\Wpinp_Settings_Model();
		register_rest_route('wp-test/v1', '/wpinpsettingfetch', [
			'methods'  => 'GET',
			'callback' =>array($class,'wpinp_callback_plugin_settings'),		
		]);

		//Update Settings
		register_rest_route('wp-test/v1', '/wpinpupdatesetting', [
			'methods'  => 'POST',
			'callback' => array($class,'wpinp_callback_save_settings'),		
		]);
	}

}

