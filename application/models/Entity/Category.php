<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 4/4/2019
 * Time: 9:07 PM
 */

namespace Entity;


use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity
 * @Table(name="categories")
 */
class Category
{
    /**
     * @var integer $name
     *
     * @Column(type="integer")
     * @Id
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string $name
     *
     * @Column(type="string", length=191)
     */
    private $name;

    /**
     * @var string $slug
     *
     * @Column(type="string", length=191)
     */
    private $slug;

    /**
     * @var string $image
     *
     * @Column(type="string", length=191)
     */
    private $image;

    /**
     * @var datetime $created_at
     *
     * @Column(name="created_at", type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     */
    private $created_at;

    /**
     * @var Entity\SubCategory $subCategories
     */
    private $subCategories;


    public function __construct()
    {
        $this->subCategories = new ArrayCollection();
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @param string $slug
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
    }

    /**
     * @param string $image
     */
    public function setImage($image)
    {
        $this->image = $image;
    }

    /**
     * @param datetime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @return datetime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @return Entity\SubCategory
     */
    public function getSubCategories()
    {
        return $this->subCategories;
    }

    /**
     * @param Entity\SubCategory $subCategories
     */
    public function setSubCategories($subCategories)
    {
        $this->subCategories = $subCategories;
    }
}