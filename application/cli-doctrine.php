<?php
/**
 * Doctrine CLI bootstrap for CodeIgniter
 *
 * Created by PhpStorm.
 * User: dell
 * Date: 4/2/2019
 * Time: 8:41 PM
 */
define('APPPATH', dirname(__FILE__) . '/');
define('BASEPATH', APPPATH . '/../system/');
define('ENVIRONMENT', 'development');

require APPPATH.'libraries/Doctrine.php';

$doctrine = new Doctrine;
$em = $doctrine->em;

$helperSet = new \Symfony\Component\Console\Helper\HelperSet(array(
    'db' => new \Doctrine\DBAL\Tools\Console\Helper\ConnectionHelper($em->getConnection()),
    'em' => new \Doctrine\ORM\Tools\Console\Helper\EntityManagerHelper($em)
));

\Doctrine\ORM\Tools\Console\ConsoleRunner::run($helperSet);
