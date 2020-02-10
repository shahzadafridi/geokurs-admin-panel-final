<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 5/7/2019
 * Time: 4:37 AM
 */
class BaseStationModel extends CI_Model
{
    public function update_record($order_id)
    {
//        $this->db->where('id',$order_id);
//        $data = array("order_status"=>"Cancel");
//        $this->db->update("orders",$data);
    }

    public function baseStationDel($base_station_id){
        foreach($base_station_id as $base_id){
            $this->db->delete('base_station', array('id' => $base_id));
        }
    }

}