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
 * @Table(name="galleries")
 */
class Gallery
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
     * @var string $image
     *
     * @Column(type="string", length=191)
     */
    private $image;

    /**
     * @var integer $module_id
     *
     * @Column(type="integer", columnDefinition="INT(11) NOT NULL AFTER image")
     */
    private $module_id;

    /**
     * @var integer $sort_order
     *
     * @Column(type="integer", columnDefinition="INT(2) NOT NULL AFTER module_id")
     */
    private $sort_order;

    /**
     * @var boolean $flag_active
     *
     * @Column(type="boolean", columnDefinition="BOOLEAN(1) NOT NULL DEFAULT 1 AFTER sort_order")
     */
    private $flag_active;

    /**
     * @var boolean $flag_thumbnail
     *
     * @Column(type="boolean", columnDefinition="BOOLEAN(1) NOT NULL DEFAULT 0 AFTER sort_order")
     */
    private $flag_thumbnail;

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
     * @return int
     */
    public function getModuleId()
    {
        return $this->module_id;
    }

    /**
     * @param int $module_id
     */
    public function setModuleId($module_id)
    {
        $this->module_id = $module_id;
    }

    /**
     * @return int
     */
    public function getSortOrder()
    {
        return $this->sort_order;
    }

    /**
     * @param int $sort_order
     */
    public function setSortOrder($sort_order)
    {
        $this->sort_order = $sort_order;
    }

    /**
     * @return boolean
     */
    public function getFlagActive()
    {
        return $this->flag_active;
    }

    /**
     * @param boolean $flag_active
     */
    public function setFlagActive($flag_active)
    {
        $this->flag_active = $flag_active;
    }

    /**
     * @return boolean
     */
    public function getFlagThumbnail()
    {
        return $this->flag_thumbnail;
    }

    /**
     * @param boolean $flag_thumbnail
     */
    public function setFlagThumbnail($flag_thumbnail)
    {
        $this->flag_thumbnail = $flag_thumbnail;
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