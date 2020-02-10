<?php defined('BASEPATH') OR exit('No direct script access allowed');

class BaseStation extends MY_Controller
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
        $xcrud->table('base_station');
        $xcrud->columns('name,latitude,longtitude,city');
        $xcrud->label(array("name"=>"Название"));
        $xcrud->label(array("latitude"=>"Широта"));
        $xcrud->label(array("longtitude"=>"Долгота"));
        $xcrud->label(array("city"=>"Город"));
        $del_url = base_url("admin/BaseStation/alldelete");
        $this->twig->display('admin/xcrud', compact('xcrud','del_url'));
    }

    public function alldelete(){
        $this->load->model('BaseStationModel');
        $something = $this->input->post('primery_keys');
        $this->BaseStationModel->baseStationDel($something);
    }

}
