<?php
/**
 * Created by PhpStorm.
 * User: MasoodUrReh
 * Date: 4/11/2019
 * Time: 11:55 PM
 */

class Logout extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->session->set_userdata("isAdminLoggedin", 0);
        $this->session->unset_userdata("admin");

        redirect("admin");
    }
}