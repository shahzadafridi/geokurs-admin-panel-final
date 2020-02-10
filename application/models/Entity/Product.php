<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 4/4/2019
 * Time: 9:07 PM
 */

namespace Entity;


/**
 * @Entity
 * @Table(name="products")
 */
class Product
{
    /**
     * @var integer $id
     *
     * @Column(type="integer")
     * @Id
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @Column(type="integer", length=11)
     */
    private $category_id;

    /**
     * @Column(type="string", length=191)
     */
    private $name;

    /**
     * @Column(type="string", length=191)
     */
    private $slug;

    /**
     * @Column(type="decimal", scale=2)
     */
    private $price;

    /**
     * @Column(type="string", columnDefinition="CHAR(3) NULL DEFAULT TZS AFTER price")
     */
    private $currency;

    /**
     * @Column(type="string", columnDefinition="VARCHAR(25) NULL AFTER currency")
     */
    private $sku;

    /**
     * @Column(type="string", columnDefinition="VARCHAR(50) NULL AFTER sku")
     */
    private $brand;

    /**
     * @Column(type="integer", columnDefinition="INT(10) NULL AFTER brand")
     */
    private $quantity;

    /**
     * @Column(type="integer", columnDefinition="INT(5) NULL AFTER quantity")
     */
    private $reward_points;

    /**
     * @Column(type="boolean", columnDefinition="BOOLEAN(1) NULL DEFAULT 1 AFTER reward_points")
     */
    private $stock_status;

    /**
     * @Column(type="text", columnDefinition="TEXT NULL AFTER stock_status")
     */
    private $description;

    /**
     * @Column(type="text", columnDefinition="TEXT NULL AFTER description")
     */
    private $introduction;

    /**
     * @var string $image
     *
     * @Column(type="string", columnDefinition="VARCHAR(191) NOT NULL AFTER description")
     */
    private $image;

    /**
     * @var boolean $is_new_arrival
     *
     * @Column(type="boolean", columnDefinition="BOOLEAN(1) NOT NULL DEFAULT 0 AFTER image")
     */
    private $is_new_arrival;

    /**
     * @var boolean $is_featured
     *
     * @Column(type="boolean", columnDefinition="BOOLEAN(1) NOT NULL DEFAULT 0 AFTER is_new_arrival")
     */
    private $is_featured;

    /**
     * @var boolean $is_special
     *
     * @Column(type="boolean", columnDefinition="BOOLEAN(1) NOT NULL DEFAULT 0 AFTER is_featured")
     */
    private $is_special;

    /**
     * @var datetime $created_at
     *
     * @Column(name="created_at", type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     */
    private $created_at;


    public function __construct()
    {
        $this->setCreatedAt(new \DateTime());
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * @param mixed $category_id
     */
    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param mixed $slug
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price)
    {
        $this->price = $price;
    }

    /**
     * @return mixed
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * @param mixed $currency
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;
    }

    /**
     * @return mixed
     */
    public function getSku()
    {
        return $this->sku;
    }

    /**
     * @param mixed $sku
     */
    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    /**
     * @return mixed
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * @param mixed $brand
     */
    public function setBrand($brand)
    {
        $this->brand = $brand;
    }

    /**
     * @return mixed
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * @param mixed $quantity
     */
    public function setQuantity($quantity)
    {
        $this->brand = $quantity;
    }

    /**
     * @return mixed
     */
    public function getRewardPoints()
    {
        return $this->reward_points;
    }

    /**
     * @param mixed $reward_points
     */
    public function setRewardPoints($reward_points)
    {
        $this->reward_points = $reward_points;
    }

    /**
     * @return mixed
     */
    public function getStockStatus()
    {
        return $this->stock_status;
    }

    /**
     * @param mixed $stock_status
     */
    public function setStockStatus($stock_status)
    {
        $this->stock_status = $stock_status;
    }

    /**
     * @return mixed
     */
    public function getIntroduction()
    {
        return $this->introduction;
    }

    /**
     * @param mixed $introduction
     */
    public function setIntroduction($introduction)
    {
        $this->introduction = $introduction;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param string $image
     */
    public function setImage($image)
    {
        $this->image = $image;
    }

    /**
     * @return bool
     */
    public function isNewArrival()
    {
        return $this->is_new_arrival;
    }

    /**
     * @param bool $is_new_arrival
     */
    public function setIsNewArrival($is_new_arrival)
    {
        $this->is_new_arrival = $is_new_arrival;
    }

    /**
     * @return bool
     */
    public function isFeatured()
    {
        return $this->is_featured;
    }

    /**
     * @param bool $is_featured
     */
    public function setIsFeatured($is_featured)
    {
        $this->is_featured = $is_featured;
    }

    /**
     * @return bool
     */
    public function isSpecial()
    {
        return $this->is_special;
    }

    /**
     * @param bool $is_special
     */
    public function setIsSpecial($is_special)
    {
        $this->is_special = $is_special;
    }

    /**
     * @return datetime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param datetime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * @return false|string
     */
    public function toJson()
    {
        $product = array();
        foreach ($this as $key => $value) {
            $product[$key] = $value;
        }
        return json_encode($product);
    }
}