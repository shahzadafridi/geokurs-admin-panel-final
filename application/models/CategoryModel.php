<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 5/18/2019
 * Time: 7:15 AM
 */
class CategoryModel extends CI_Model
{
    public function __construct()
    {
        $this->load->library('doctrine');
        $this->category = $this->doctrine->em->getRepository("Entity\Category");
        $this->subCategory = $this->doctrine->em->getRepository("Entity\SubCategory");
    }

    public function getOneById($id)
    {
        return $this->subCategory->findOneById($id);
    }

    public function getMainCategoryById($id)
    {
        return $this->category->findOneById($id);
    }
}