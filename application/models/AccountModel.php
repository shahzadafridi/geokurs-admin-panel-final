<?php

use Entity\User;

/**
 * Created by PhpStorm.
 * User: dell
 * Date: 5/12/2019
 * Time: 3:47 AM
 */
class AccountModel extends CI_Model
{
    public function __construct()
    {

    }

    public function update_account($data,$id)
    {
        $this->db->where("id",$id);
        $this->db->update('users',$data);
        return $this->get_user($id);
    }
    public function update_account_profile($data,$id)
    {
        $this->db->where("id",$id);
        $this->db->update('users',$data);
        return $this->get_user($id);
    }
    public function update_address_book($data,$id)
    {
        $this->db->where("id",$id);
        $this->db->update('address_books',$data);
        return $this->get_user_address_book($id);
    }
    public function remove_whislist($id)
    {
        $this->db->where("id",$id);
        $this->db->delete('wishlist');
    }

    public function get_wish_list($id)
    {
        $this->db->select('wishlist.*,products.name');
        $this->db->where('user_id',$id);
        $this->db->join('products', 'products.id = wishlist.product_id');
        return $this->db->get("wishlist")->result();
    }
    public function get_user($user_id)
    {
        $this->db->where('id',$user_id);
        $db_user = $this->db->get("users")->row();
        $user = new Entity\User();
        $user->setName($db_user->name);
        $user->setEmail($db_user->email);
        $user->setPassword("");
        $user->setTelephone($db_user->telephone);
        $user->setUserImg($db_user->user_img);
        return $user;
    }
    public function get_user_address_book($user_id)
    {
        $this->db->where('user_id',$user_id);
        return $this->db->get("address_books")->row();
    }
}