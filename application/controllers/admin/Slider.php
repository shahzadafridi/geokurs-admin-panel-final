<?php defined('BASEPATH') OR exit('No direct script access allowed');


class Slider extends MY_Controller
{
    public function index()
    {
        $xcrud = xcrud_get_instance();
        $xcrud->table('sliders');
        $xcrud->change_type('image', 'image', '', array('width' => 720, 'path' => '../../assets/uploads/slider_images'));
        $xcrud->label(array('img_name' => "Название"));
        $xcrud->label(array("image"=>"Картинка"));
        $menu = $this->loadMenu("slider");
        $this->twig->display('admin/xcrud', compact('xcrud', 'menu'));
    }
}