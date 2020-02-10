<?php

class DashboardModel extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        
    }

    /*Number of Insntruction Count */
    public function numberofinstructions(){
        $numberofinstruction = $this->db->count_all_results('instruction');
    return $numberofinstruction;
    }
    /*Number of Station Count */
    public function numberofbasestations(){
        $numberofstation = $this->db->count_all_results('base_station');
    return $numberofstation;
    }

    /*Number of Categories Count */
    public function numberofcategories(){
        $numberofcat = $this->db->count_all_results('categories');
        return $numberofcat;
    }

}