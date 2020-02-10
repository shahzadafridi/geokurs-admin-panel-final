<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 5/7/2019
 * Time: 4:37 AM
 */
class MenuModel extends CI_Model
{
    public function __construct()
    {
        $this->load->library('doctrine');
        $this->category = $this->doctrine->em->getRepository("Entity\Category");
        $this->subCategory = $this->doctrine->em->getRepository("Entity\SubCategory");
    }

    public function getHomepageMenus()
    {
        $result = array();

        // findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
        $parents = $this->category->findBy(array(), array(
            'id' => 'DESC'
        ));

        foreach ($parents as $parent) {
            $child = $this->subCategory->findBy(array('category_id' => $parent->getId()));
            $parent->setSubCategories($child);
            array_push($result, $parent);
        }

        return $result;
    }

    public function getMainCategoryBySlug($slug)
    {
        return $this->category->findOneBySlug($slug);
    }

    public function getSubCategoryBySlug($slug)
    {
        return $this->subCategory->findOneBySlug($slug);
    }

    public function getSubCategoriesByParentId($id)
    {
        return $this->subCategory->findBy(array('category_id' => $id));
    }

    public function getMainMenuProductsById($id)
    {
        $dataAdapter = $this->db->select('p.*')
                    ->from('sub_categories AS sc')
                    ->join('products AS p', 'p.category_id = sc.id')
                    ->where('sc.category_id', $id)
                    ->order_by('p.created_at', 'DESC')
                    ->get();
        return $this->populate($dataAdapter->result());
    }

    public function getSubMenuProductsById($id)
    {
        $dataAdapter = $this->db->select('p.*')
            ->from('sub_categories AS sc')
            ->join('products AS p', 'p.category_id = sc.id')
            ->where('sc.id', $id)
            ->order_by('p.created_at', 'DESC')
            ->get();
        return $this->populate($dataAdapter->result());
    }

    public function populate($data)
    {
        $products = array();
        if ($data > 0)
        {
            foreach ($data as $row)
            {
                $product = new Entity\Product();
                $product->setId($row->id);
                $product->setName($row->name);
                $product->setSlug($row->slug);
                $product->setPrice($row->price);
                $product->setCurrency($row->currency);
                $product->setSku($row->sku);
                $product->setBrand($row->brand);
                $product->setRewardPoints($row->reward_points);
                $product->setStockStatus($row->stock_status);
                $product->setIntroduction($row->introduction);
                $product->setDescription($row->description);
                $product->setImage($row->image);
                $product->setIsNewArrival($row->is_new_arrival);
                $product->setIsFeatured($row->is_featured);
                $product->setIsSpecial($row->is_special);
                $product->setCreatedAt(new \DateTime($row->created_at));
                array_push($products, $product);
            }
        }
        return $products;
    }
}