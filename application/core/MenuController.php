<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 4/5/2019
 * Time: 12:36 AM
 */

class MenuController
{
    private $current_menu;

    public function __construct($current_menu)
    {
        $this->current_menu = $current_menu;
    }

    public function getStatus($menu_name)
    {
        return ($this->current_menu == $menu_name) ? "active" : "";
    }
}