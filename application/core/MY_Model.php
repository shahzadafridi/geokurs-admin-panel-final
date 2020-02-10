<?php

class MY_Model extends CI_Model {
	
    const DB_TABLE = 'abstract';
    const DB_TABLE_PK = 'abstract';
    
    /**
     * Create record.
     */
    private function insert() {
        $this->db->insert($this::DB_TABLE, $this);
        $this->{$this::DB_TABLE_PK} = $this->db->insert_id(); 
    }
    
    /**
     * Update record.
     */
    private function update() {
        /**
         * $this::DB_TABLE_PK = const DB_TABLE_PK = 'publication' (Column name)
         * $this->{$this::DB_TABLE_PK} = $this->publication_id = (value of var)
         * $publication_id variable value.
         */
        $this->db->where($this::DB_TABLE_PK, $this->{$this::DB_TABLE_PK});
        $this->db->update($this::DB_TABLE, $this);
    }
	
	 /**
     * Update columns of a single row.
     */
    public function updateField($data) {
        /**
         * $this::DB_TABLE_PK = const DB_TABLE_PK = 'publication' (Column name)
         * $this->{$this::DB_TABLE_PK} = $this->publication_id = (value of var)
         * $publication_id variable value.
         */
        $this->db->where($this::DB_TABLE_PK, $this->{$this::DB_TABLE_PK});
        $this->db->update($this::DB_TABLE, $data);

        return $this->db->affected_rows();
    }
    
    /**
     *  Populate from an array or standard class 
     *  @param mixed $row
     * 
     *   $publicatons = array("p_id" => "1", "pname" => "ali");
     *   foreach($publicatons as $publicaton => $value ) {
     *   $this->$publicaton = $value;
     *   echo $this->$publicaton;
     *   
     *   output : 1 ali
     * This function means to assign the db columns value to the variables
     * of the calling class.
     */
    public function populate($row) {
        foreach($row as $key => $value) {
            /**
             * Set the obj variable value with $value variable.
             * e.g publication_id and publication name if this is called
             * by publication object.
             */
            $this->$key = $value;
        }
    } 
    
    /**
     * Load from the database
     * @param int $id
     */
    public function load($id) {
        $query = $this->db->get_where($this::DB_TABLE, array(
            $this::DB_TABLE_PK => $id,
        ));
        /**
         * Assign the table value to the object variable value.
         */
        
        if ($query->num_rows() > 0)
        {
            $this->populate($query->row());
        }
    }
   
    /**
     * Delete the current record.
     */
    public function delete() {
        $this->db->delete($this::DB_TABLE, array(
            $this::DB_TABLE_PK => $this->{$this::DB_TABLE_PK}, 
        ));

        unset($this->{$this::DB_TABLE_PK});
        
        return $this->db->affected_rows();
    }
   
    /**
     * Save the record
     */
    public function save() {
        if(isset($this->{$this::DB_TABLE_PK})) {
            $this->update();
        }
        else {
            $this->insert();
        }
    }
    
    /**
     * Get array model of Models with an options limit and offset
     * 
     * @param int $limit optional
     * @param int $offset optional; if set, required $limit
     * @return array Models populated by database, keyed by PK.
     * Default value of both the variables is zero.
     */
    public function get($limit = 0, $offset = 0) {
        if($limit) {
            $query = $this->db->get($this::DB_TABLE, $limit, $offset);
        }
        else {
            $query = $this->db->get($this::DB_TABLE);
        }
        $ret_val = array();
        $class = get_class($this);
        foreach($query->result() as $row) {
            $model = new $class;
            $model->populate($row);
            //$ret_val[$row->{$this::DB_TABLE_PK}] = $model;
            $ret_val[] = $model;
            /**
             * $ret_val[$row->{$this::DB_TABLE_PK}] = $model
             * same as $ret_val['publication_id'] = $model
             * more elaborately this is equal to 
             * $ret_val[1] = $model,$ret_val[2] = $model and so on ... 
             * $row->{$this::DB_TABLE_PK} = represtn cloumns publication_id 
             * $this::DB_TABLE_PK = val of the const DB_TABLE_PK of the calling 
             * class which is publication_id incase if the callser is 
             * publication.
             */
        }
        /**
         * $ret_val The array of object return to the caller
         * e.g
         * $ret_val = [
         *  {'publication_id' => '1', 'publication_name' => 'Ali'},
         *  {'publication_id' => '2', 'publication_name' => 'Afridi'},
         *  {'publication_id' => '3', 'publication_name' => 'Khan'},
         * ];
         * 
         * return three object depends on $limit.
         */
        return $ret_val;
    }

    public function get_where($where) {
        $query = $this->db->get_where($this::DB_TABLE, $where);

        $ret_val = array();
        $class = get_class($this);
        foreach($query->result() as $row) {
            $model = new $class;
            $model->populate($row);
            //$ret_val[$row->{$this::DB_TABLE_PK}] = $model;
            $ret_val[] = $model;
        }

        return $ret_val;
    }
	
	/**
	 * Return number of rows of the table.	
	*/
	public function total_rows() {
		//$query = $this->db->query('SELECT * FROM my_table');
		$query = $this->db->get($this::DB_TABLE);
		return $query->num_rows();
	}
    
}
