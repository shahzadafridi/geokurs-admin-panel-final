<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 5/12/2019
 * Time: 3:47 AM
 */
class SettingModel extends CI_Model
{
    public function __construct()
    {

    }

    public function update_settings($data)
    {
        $this->db->update('settings',$data);
    }
    public function get_settings()
    {
        return $this->db->get('settings')->result_array()[0];
    }
    public function subscribe_email($email)
    {
        $row =  $this->db->where("email",$email)->get('subscribe')->num_rows();

        if($row == 0)
        {
            $inser_array = array('email'=>$email);
            $this->db->insert('subscribe',$inser_array);
            return true;
        }else{
            return false;
        }

    }
}