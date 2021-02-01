# Wp test plugin

Test link will be added to the sidebar admin navigation

Plugin to create a custom query variable on WordPress to create a view of the user's list.

  - Admin setting page to change the URL
  - Users list on the front end with links to view user detail page
  - Single user page with next and previous buttons 

# Built using ReactJs!

  - Used React Js for UI 
  - WordPress is getting in to React Js on updates so decided to create a plugin using React Js 
  - Precompiled JS files with the options covered and React Request has a built-in response caching system

# Composer Update

  - Use Composer Update to test the plugin
  - Use Composer dump-autoload -o this will load the files and it is mandatory to load the desired files before testing
  - After update navigate to plugin folder on the terminal and use for windows.\vendor\bin\phpunit for linux ./vendor/bin/phpunit to make unit testing
  
# MVC 

    - Plugin is created on MVC structure
    - To enhance the plugin following the MVC structure will be useful and we can easily narrow down to the files for debugging
    - Find the PHP files in the app folder 
    
### Tech

Wp test plugin uses a number of open-source projects to work properly:

* [React JS] - Prebuilded JS 
* [Wordpress] 

### Installation
Clone the repository and install the plugin on your WordPress site, Simply activating the plugin will work, If you need to run the PHP Unit test update the folder by composer update.
