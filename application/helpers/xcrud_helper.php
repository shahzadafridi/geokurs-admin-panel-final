<?php
require_once APPPATH . 'xcrud/xcrud.php';

if (!function_exists('xcrud_get_instance'))
{
    function xcrud_get_instance($name = false)
    {
        $CI = &get_instance();
        $CI->load->library('session');
        $CI->load->helper('url');
        Xcrud_config::$scripts_url = base_url('');
        $xcrud = Xcrud::get_instance($name);
        return $xcrud;
    }
}

if (!function_exists('xcrud_store_session'))
{
    function xcrud_store_session()
    {
        $CI = &get_instance();
        $CI->load->library('session');
        $CI->session->set_userdata(array('xcrud_sess' => Xcrud::export_session()));
    }
}

if (!function_exists('xcrud_restore_session'))
{
    function xcrud_restore_session()
    {
        $CI = &get_instance();
        $CI->load->library('session');
        Xcrud::import_session($CI->session->userdata('xcrud_sess'));
    }
}

if (!function_exists('insert_before'))
{
    function insert_before($postdata, $xcrud)
    {
        $slugify = new Cocur\Slugify\Slugify();
        $name = $postdata->get("name");
        $postdata->set("slug", $slugify->slugify($name));
    }
}

if (!function_exists('blog_insert_before'))
{
    function blog_insert_before($postdata, $xcrud)
    {
        $slugify = new Cocur\Slugify\Slugify();
        $name = $postdata->get("blog_name");
        $postdata->set("slug", $slugify->slugify($name));
    }
}

if (!function_exists('blog_category_insert_before'))
{
    function blog_category_insert_before($postdata, $xcrud)
    {
        $slugify = new Cocur\Slugify\Slugify();
        $name = $postdata->get("category_name");
        $postdata->set("slug", $slugify->slugify($name));
    }
}