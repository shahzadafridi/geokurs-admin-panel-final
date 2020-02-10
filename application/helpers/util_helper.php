<?php

if (!function_exists('dd'))
{
    function dd($data)
    {
        echo '<pre>'; print_r($data); exit();
    }
}

if (!function_exists('authCheck'))
{
    function authCheck($user)
    {
        $ci =& get_instance();

        if ($user == "admin") {
            return $ci->session->userdata("isAdminLoggedin");
        } else if ($user == "user") {
            return $ci->session->userdata("isUserLoggedin");
        }
    }
}

if (!function_exists('getAuthUser'))
{
    function getAuthUser($user)
    {
        $ci =& get_instance();

        if ($user == "admin") {
            return $ci->session->userdata("admin");
        } else if ($user == "user") {
            return $ci->session->userdata("user");
        }
    }
}

if (!function_exists('asset'))
{
    function asset($path)
    {
        return base_url() . 'assets/'.$path;
    }
}

if (!function_exists('formdata'))
{
    function formdata($key, $default = '')
    {
        $ci =& get_instance();

        $payload = $ci->session->userdata('formdata');
        return isset($payload[$key]) ? $payload[$key] : $default;
    }
}

if (!function_exists('get_segment'))
{
    function get_segment($index)
    {
        $ci =& get_instance();

        return $ci->uri->segment($index);
    }
}