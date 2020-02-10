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
 * @Table(name="users")
 */
class User
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
     * @var string $name
     *
     * @Column(type="string", length=191)
     */
    private $name;

    /**
     * @var string $email
     *
     * @Column(type="string", length=191)
     */
    private $email;

    /**
     * @var string $password
     *
     * @Column(type="string", length=191)
     */
    private $password;

    /**
     * @var string $telephone
     *
     * @Column(type="string", length=25)
     */
    private $telephone;

    /**
     * @var datetime $created_at
     *
     * @Column(name="created_at", type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     */
    private $created_at;

    /**
     * @var string $user_img
     *
     * @Column(type="string", length=300)
     */
    private $user_img;


    /**
     * User constructor.
     */
    public function __construct()
    {
        $this->setCreatedAt(new \DateTime());
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = password_hash($password, PASSWORD_DEFAULT);
    }

    /**
     * @param string $telephone
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
    }

    /**
     * @param datetime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }
    public function setUserImg($user_img)
    {
        $this->user_img = $user_img;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    public function getUserImg()
    {
        return $this->user_img;
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
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @return string
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * @return datetime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }
}