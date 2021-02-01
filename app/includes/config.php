<?php
  if(!function_exists('wp_test_activation_init')){
    function wp_test_activation_init() {  
          wpinp_write_js_constants();
          wpinp_default_settings();
      }
  }
  //Add needed controller and model
  if (is_admin()){
    $auto_ctrl_files = array('Wpinp_Admin_Controller');
    $auto_model_files = array('Wpinp_Settings_Model');
  }else{
    $auto_ctrl_files = array('Wpinp_View_Controller');
    $auto_model_files = array('Wpinp_Settings_Model');
  }

  /***************** File paths ******************/
  define('WPINSP_TYPE', 'testsetting');
  define('WP_MODEL_PATH',WP_TEST_ABSPATH.'app/model/');
  define('WP_CONTROLLER_PATH',WP_TEST_ABSPATH.'app/controller/');
  define('WP_VIEWS',WP_TEST_ABSPATH.'app/views/');
  define('WP_VIEWS_PHP',WP_TEST_ABSPATH.'app/views/view_php/');

  /******** Intialize the needed classes **********/
  test_controller_autoload($auto_ctrl_files);
  test_model_autoload($auto_model_files);

  function test_controller_autoload($class_name)
  {
    if(!empty($class_name)){
      foreach($class_name as $class_nam):
        $filename = strtolower($class_nam).'.php';
        $file = WP_CONTROLLER_PATH.$filename;
        if (file_exists($file) == false){
          return false;
        }
        include_once($file);
        $cname = "App\\Controller\\".$class_nam;
        new $cname;
      endforeach;
    }               
  }

  function test_model_autoload($class_name)
  {
    if(!empty($class_name)){
      foreach($class_name as $class_nam):
        $filename = strtolower($class_nam).'.php';
        $file = WP_MODEL_PATH.$filename;

        if (file_exists($file) == false){
          return false;
        }
        include_once($file);
        $cname = "App\\Model\\".$class_nam;
        new $cname;
      endforeach;
    }
  }

  //Rest class must be added at the last 
  $rest_class = array('Wpinp_Rest_Controller');
  test_controller_autoload($rest_class);

  //On plugin intialize create Js Constants
  if(!function_exists('wpinp_write_js_constants')){
    function wpinp_write_js_constants(){
      global $wpdb;
      $react_js = get_option('wpinp_react_constant');
      $file = WP_VIEWS.'constants.js';
      if(file_exists($file) && $react_js==''){
          $fh = fopen( 'filelist.txt', 'w' );
          fclose($fh);
          // Open the file to get existing content
          $current = file_get_contents($file);
          // Append a new person to the file
          $current .= "export const PLUGIN_VERSION = '1';\n";
          $current .= "export const SITE_LANG = '".get_locale()."';\n";
                  
          $current .= "export const PLUGIN_NAME = 'WordPress test Plugin';\n";
          // Write the contents back to the file
          file_put_contents($file, $current);
          update_option('wpinp_react_constant','1');
        }
    }
  }

  //On plugin intialize set settings
  if(!function_exists('wpinp_default_settings')){
    function wpinp_default_settings(){
      global $wpdb;
      $setting_check = get_option('test_custom_end_point');
      if($setting_check==''){
        $settings = array('custom_point'=>'user-list','query_var'=>'test');
        update_option('test_custom_end_point', $settings);
      }
    }
  }
?>
