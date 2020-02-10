<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 5/7/2019
 * Time: 4:37 AM
 */
class InstructionModel extends CI_Model
{
    public function update_record($order_id)
    {
//        $this->db->where('id',$order_id);
//        $data = array("order_status"=>"Cancel");
//        $this->db->update("orders",$data);
    }

    public function instructionDel($instruct_id){
        foreach($instruct_id as $id){
            $this->db->delete('base_station', array('id' => $id));
        }
    }

}