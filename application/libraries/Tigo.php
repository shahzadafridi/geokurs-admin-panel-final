<?php

class Tigo
{
    const URL = "https://secure.tigo.com";
    const VERSION = "v1";
    const PUBLIC_KEY = "QokTxmDIcx2QAgpwplrkJxA1OYhw1A5L";
    const SECRET_KEY = "wAfFtt2jT5ELSgqh";


    public function genAccessToken()
    {
        $header = array('Content-Type: application/x-www-form-urlencoded');
        $payload = http_build_query(array(
            "client_id" => self::PUBLIC_KEY,
            "client_secret" => self::SECRET_KEY
        ));

        $response = $this->callService("POST", "oauth/generate/accesstoken?grant_type=client_credentials", $payload, $header);

        return $response->accessToken;
    }

    public function pay($payload, $accessToken)
    {
        if (empty($payload)) {
            throw new Exception("Request payload is required");
        }
        
        $header = array('Content-Type: application/json', "accessToken:{$accessToken}");
        $payload = json_encode($payload);

        $response = $this->callService("POST", "tigo/payment-auth/authorize", $payload, $header);

        return $response;
    }

    public function callService($method = "GET", $service, $payload, array $header)
    {
        if (empty($service)) {
            throw new Exception("Service uri is required");
        }

        if (empty($payload)) {
            throw new Exception("Request payload is required");
        }

        $url = self::URL.'/'.self::VERSION.'/'.$service;

        // Get cURL resource
        $curl = curl_init();
        $configs = array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_USERAGENT => 'shop[dot]bafredo[dot]com',
        );

        if (strtoupper($method) == "POST") {
            $configs[CURLOPT_POST] = 1;
            $configs[CURLOPT_POSTFIELDS] = $payload;
            $configs[CURLOPT_HTTPHEADER] = $header;
        }
        
        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, $configs);
        
        // Send the request & save response to $resp
        $resp = json_decode(curl_exec($curl));

        if( ! $resp ) {
            throw new Exception('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
        }

        // Close request to clear up some resources
        curl_close($curl);

        return $resp;
    }
}