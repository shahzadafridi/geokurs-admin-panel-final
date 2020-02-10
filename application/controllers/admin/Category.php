<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends MY_Controller
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
        $xcrud->table('categories');
        $xcrud->fields(array("created_at","slug"), true);
        $xcrud->before_insert ("insert_before");
        $xcrud->before_update ("insert_before");
        $xcrud->columns(array('image','name'));
        $xcrud->label(array("image"=>"Картинка"));
        $xcrud->label(array("name"=>"Название"));
        $xcrud->column_class('image', 'zoom_img');
        $xcrud->change_type('image', 'image', '', array('width' => 300, 'path' => '../../assets/front/uploads'));
        $xcrud->order_by('id','desc');
        $menu = $this->loadMenu("category");
        $this->twig->display('admin/xcrud', compact('xcrud', 'menu'));
	}
    public function sub()
    {
        $xcrud = xcrud_get_instance();
        $xcrud->table('sub_categories');
        $xcrud->fields(array("created_at","slug"), true);
        $xcrud->relation('category_id', 'categories', 'id','name');
        $xcrud->label(array("category_id"=>"Category"));
        $xcrud->before_insert ("insert_before");
        $xcrud->before_update ("insert_before");
        $xcrud->columns(array('image','name','category_id'));
        $xcrud->column_class('image', 'zoom_img');
        $xcrud->change_type('image', 'image', '', array('width' => 300, 'path' => '../../assets/front/uploads'));
        $xcrud->order_by('id','desc');
        $menu = $this->loadMenu("category/sub");
        $this->twig->display('admin/xcrud', compact('xcrud', 'menu'));
    }
}
