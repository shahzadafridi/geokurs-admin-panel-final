<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();

        if (!authCheck("admin")) {
            redirect("admin/login");
        }
        $this->load->model('DashboardModel');
    }

    public function index()
    {
        $menu = $this->loadMenu("dashboard");
        $data['instructions'] = $this->DashboardModel->numberofinstructions();
        $data['basestations'] = $this->DashboardModel->numberofbasestations();
        $data['categories'] = $this->DashboardModel->numberofcategories();

        $xcrud = xcrud_get_instance();
//        $xcrud->language('ru');   russian language.
        $xcrud->table('instruction');
        $xcrud->relation('category_id', 'sub_categories', 'id','name');
        $xcrud->label(array("category_id"=>"Категория"));
        $xcrud->label(array("link"=>"Pdf"));
        $xcrud->columns(array('category_id','title','description','link'));
        $xcrud->label(array("categroy"=>"Категория"));
        $xcrud->label(array("title"=>"Заголовок"));
        $xcrud->label(array("description"=>"Описание"));
        $xcrud->column_cut(80,'description');
        $xcrud->column_cut(30,'link');
        $xcrud->change_type('link', 'file', '', array('not_rename'=>true,'path' => '../../assets/uploads/instruction'));
        $xcrud->column_pattern('link', '<a href="http://cardinalfund.com/wp-test-admin/geokurs/assets/uploads/instruction/{link}">{link}</a>');
        $this->twig->display('admin/dashboard', compact('menu', 'data', 'xcrud'));
    }

    public function settings()
    {
        $this->load->library('upload');
        $this->load->Model('SettingModel', 'SM');
        $this->load->helper(array('form', 'url'));
        $post = $this->input->post();
        $image_path = FCPATH . "/assets/front/image/";
        $data["result"] = $this->SM->get_settings();
        if (!empty($post)) {
            $config['upload_path'] = $image_path;
            $config['allowed_types'] = 'png|jpg|gif';
            $config['max_size'] = 2048;
            $config['encrypt_name'] = TRUE;
            $this->upload->initialize($config);
            if (!empty($_FILES["favicon"]["name"])) {
                if (!empty($_FILES['favicon']['name'])) {
                    if (!$this->upload->do_upload('favicon')) {
                        $data['errors'] = $this->upload->display_errors();
                        $error = true;
                    } else {
                        $favicon = $this->upload->data("file_name");
                        if (file_exists($image_path . $data["result"]["favicon"])) {
                            unlink($image_path . $data["result"]["favicon"]);

                        }
                        $post["favicon"] = $favicon;

                    }
                }
            }

            if (!empty($_FILES['logo']['name'])) {
                if (!$this->upload->do_upload('logo')) {
                    $errors = $this->upload->display_errors();
                    $data['errors'] = $errors;
                    $error = true;
                } else {
                    $logo = $this->upload->data("file_name");
                    if (file_exists($image_path . $data["result"]["logo"])) {
                        unlink($image_path . $data["result"]["logo"]);
                    }
                    $post["logo"] = $logo;
                }
            }
            if (empty($error)) {
                $this->SM->update_settings($post);
                $data["success"] = "Update Successfully";
                $data["result"] = $this->SM->get_settings();
            }
            $menu = $this->loadMenu("General Settings");
            $this->twig->display('admin/settings', compact('menu', 'data'));

        } else {
            $menu = $this->loadMenu("General Settings");
            $this->twig->display('admin/settings', compact('menu', 'data'));
        }
    }

    public function instructions()
    {
        $xcrud = xcrud_get_instance();
        $xcrud->table('instruction');
        $xcrud->relation('category_id', 'categories', 'id','name');
        $xcrud->label(array("link"=>"Pdf"));
        $xcrud->columns(array('category_id','title','description','link'));
        $xcrud->label(array("categroy"=>"Категория"));
        $xcrud->label(array("title"=>"Заголовок"));
        $xcrud->label(array("description"=>"Описание"));
        $del_url = base_url("admin/dashboard/instructDel");
        $this->twig->display('admin/xcrud', compact('xcrud', 'del_url'));
    }

    public function instructDel()
    {
        $this->load->model('InstructionModel');
        $instruct_id = $this->input->post('primery_keys');
        $this->InstructionModel->instructionDel($instruct_id);
    }

}
