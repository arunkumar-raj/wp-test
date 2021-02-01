<?php
use PHPUnit\Framework\TestCase;
use Brain\Monkey;

class AdminhookTest extends TestCase {

    protected function setUp(): void {
        parent::setUp();
        Monkey\setUp();
    }
    
    protected function tearDown(): void {
        Monkey\tearDown();
        parent::tearDown();
    }
    
    //Test admin controller action
    public function testAddedhooks() {
        $class = new \App\Controller\Wpinp_Admin_Controller();
        $class->__construct();
        self::assertTrue( has_action('admin_menu', '\App\Controller\Wpinp_Admin_Controller->wp_test_admin_menu()', 20) );
        self::assertTrue( has_action('admin_enqueue_scripts', '\App\Controller\Wpinp_Admin_Controller->wp_test_css_scripts()', 20) );
    }

    //Rest Controller test
    public function testRestinitate() {
        $class = new \App\Controller\Wpinp_Rest_Controller();
        $class->__construct();
        self::assertTrue( has_action('rest_api_init', '\App\Controller\Wpinp_Rest_Controller->wpinp_rest_api_register()', 20) );
    }
    
}
?>