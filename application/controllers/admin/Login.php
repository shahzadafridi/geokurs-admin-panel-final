<?php
/**
 * Created by PhpStorm.
 * User: MasoodUrReh
 * Date: 4/11/2019
 * Time: 11:55 PM
 */

class Login extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();

        if (authCheck("admin")) {
            redirect("admin/dashboard");
        }

        $this->load->library('doctrine');
    }

    public function index()
    {
        $email = $this->input->post("email");

         $em = $this->doctrine->em;
         $admin = $em->getRepository("Entity\Admin")->findOneByEmail($email);

        if (! empty($admin))
        {
            $password = $this->input->post("password");
            // match password
            if (password_verify($password, $admin->getPassword()))
            {
                $this->session->set_userdata("isAdminLoggedin", 1);
                $this->session->set_userdata("admin", $admin);

                redirect("admin/dashboard");
            }
        }

        redirect("admin");
    }
}