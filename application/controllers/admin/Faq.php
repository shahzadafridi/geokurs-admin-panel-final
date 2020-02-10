<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Faq extends MY_Controller
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
        $xcrud->table('faq');
        $xcrud->columns('question,answer');
        $xcrud->label(array("question"=>"Вопрос"));
        $xcrud->label(array("answer"=>"Oтвет"));
        $del_url = base_url("admin/Faq/alldelete");
        $this->twig->display('admin/xcrud', compact('xcrud','del_url'));
    }

    public function alldelete(){
        $this->load->model('FaqModel');
        $something = $this->input->post('primery_keys');
        $this->FaqModel->baseStationDel($something);
    }

}
