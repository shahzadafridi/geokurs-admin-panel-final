<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Accounts extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();

        if (!authCheck("admin")) {
            redirect("admin/login");
        }
    }

    public function index()
    {
        $xcrud = xcrud_get_instance();
        $xcrud->table('users');
        $xcrud->columns(array("name","email","telephone"));
        $xcrud->fields(array("password",'created_at'),true);
        $xcrud->before_insert ("insert_before_user");
        $xcrud->before_update ("insert_before_user");
        $menu = $this->loadMenu("category");
        $this->twig->display('admin/xcrud', compact('xcrud', 'menu'));
    }
}
