<?php
	namespace App\Model;

	class Wpinp_Settings_Model {

		//Retrieve saved settings
		public static function wpinp_callback_plugin_settings(){
            global $wpdb;
			$options = get_option('test_custom_end_point');
			$return_val = array('settings'=>$options);
            return $return_val;
		}
		
		//Save Settings 
		public static function wpinp_callback_save_settings($request_data){
            $result = $request_data->get_params();	
            update_option('test_custom_end_point',$result);
            return new \WP_REST_Response($result,200);
		}
		
	}

?>