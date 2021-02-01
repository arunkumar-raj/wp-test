<?php
/*
Plugin Name: WP sample Test
Version: 1.0
Description: Read json and display in custom endpoint
Author: Arunkumar
Author URI:
Copyright (c) 2008-2020 test All Rights Reserved.
*/
if ( ! defined( 'ABSPATH' ) ) exit;
global $wpdb;

define('WP_TEST_ABSPATH', dirname(__FILE__) . '/');
require_once('app/includes/config.php');
register_activation_hook(__FILE__,'wp_test_activation_init');