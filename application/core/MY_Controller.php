<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 4/5/2019
 * Time: 12:35 AM
 */

require_once "MenuController.php";

class MY_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('MenuModel', 'menu');
        $this->load->model('SettingModel', 'sm');
        $settins = $this->sm->get_settings();
        $menus = $this->menu->getHomepageMenus();
        $this->twig->addGlobal('menus', $menus);
        $this->session->set_userdata('currency', 'TZS');
        $this->twig->addGlobal('setting', $settins);
        $this->twig->addGlobal('user', getAuthUser("user"));
    }

    public function loadMenu($name)
    {
        return new MenuController($name);
    }

    public function authCheck()
    {
        if (! authCheck("user")) {
            redirect("login");
        }
    }
}