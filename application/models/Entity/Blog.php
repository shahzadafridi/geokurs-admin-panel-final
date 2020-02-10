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
 * @Table(name="blogs")
 */
class Blog
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
     * @var string $category_id
     *
     * @Column(type="integer", length=11)
     */
    private $category_id;

    /**
     * @var string $blog_name
     *
     * @Column(type="string", length=191)
     */
    private $blog_name;

    /**
     * @var string $description
     *
     * @Column(type="text")
     */
    private $description;

    /**
     * @var integer $slug
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
     * @return string
     */
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * @param string $category_id
     */
    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    /**
     * @return string
     */
    public function getBlogName()
    {
        return $this->blog_name;
    }

    /**
     * @param string $blog_name
     */
    public function setBlogName($blog_name)
    {
        $this->blog_name = $blog_name;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return int
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param int $slug
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
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
}