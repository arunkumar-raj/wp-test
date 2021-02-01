<?php
use PHPUnit\Framework\TestCase;
use Brain\Monkey;

class ViewhookTest extends TestCase {

    protected function setUp(): void {
        parent::setUp();
        Monkey\setUp();
    }
    
    protected function tearDown(): void {
        Monkey\tearDown();
        parent::tearDown();
    }
    
    //Test admin controller action
    public function testViewAddedhooks() {
        $class = new \App\Controller\Wpinp_View_Controller();
        $class->__construct();
        
        self::assertTrue( has_action('template_redirect', '\App\Controller\Wpinp_View_Controller->wp_test_user_list()', 20) );
        self::assertTrue( has_action('wp_enqueue_scripts', '\App\Controller\Wpinp_View_Controller->wp_test_css_scripts()', 20) );
        self::assertTrue( has_filter('query_vars', '\App\Controller\Wpinp_View_Controller->wp_test_query_vars()', 20) );
        self::assertTrue( has_filter('generate_rewrite_rules', '\App\Controller\Wpinp_View_Controller->wp_test_rewrite_rules()', 20) );
    }

}
?>