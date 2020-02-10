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
 * @Table(name="admins")
 */
class Admin
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
     * @var datetime $created_at
     *
     * @Column(name="created_at", type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     */
    private $created_at;


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
        $this->password = password_hash($password);
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
     * @return datetime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }
}