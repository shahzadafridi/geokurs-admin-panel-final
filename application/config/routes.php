<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'admin';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['admin'] = 'admin/admin';
$route['admin/settings'] = 'admin/dashboard/settings';

$route['page/(.*)/(.*)'] = 'page/$1/$2';
$route['page(.*)'] = 'page/index$1';
$route['account/remove_history(.*)(.*)'] = 'account/remove_history$1';
$route['account/order_history(.*)'] = 'account/order_history$1';

$route['api/user/register'] = 'api/ApiController/register_user';
$route['api/user/login'] = 'api/ApiController/login_user';
$route['api/stations'] = 'api/ApiController/get_stations';
$route['api/sliders'] = 'api/ApiController/get_sliders';
$route['api/categories'] = 'api/ApiController/get_categories';
$route['api/sub_categories'] = 'api/ApiController/get_sub_categories';
$route['api/faqs'] = 'api/ApiController/get_faqs';
$route['api/instructions'] = 'api/ApiController/get_instructions';
$route['api/instructions/id'] = 'api/ApiController/search_instruction_by_id';
$route['api/category/instructions'] = 'api/ApiController/search_instruction_by_category_id';

$route['category(.*)'] = 'category/index$1';
