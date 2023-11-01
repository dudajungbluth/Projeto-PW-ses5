<?php

require "conection.php";

header("Content-Type: application/json");

$output = [];

// valida campos
$output = validate();
if ($output["status"] == "erro"){
    echo json_encode($output);
    exit;
}

$name = $_POST["name"];
$email = $_POST["email"];
// criptografa senha
// https://www.php.net/manual/pt_BR/function.password-hash.php
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$query = "SELECT * FROM usuarios WHERE email_user = :email_user";
$stmt = $conn->prepare($query);
$stmt->bindParam("email",$email["email"]);
$stmt->execute();
if($stmt->rowCount() == 1){
    $response = [
        "type" => "error",
        "message" => "E-mail já cadastrado!"
    ];
    echo json_encode($response);
    exit;
}

// insere usuário
$sql = "INSERT INTO usuarios (name_user, email_user,senha_user) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([$name, $email, $password]);

$output["status"] = "sucesso";
$output["message"] = "Usuário cadastrado com sucesso.";
echo json_encode($output);

function validate(){
    $response = [];
    $response["status"] = "erro";

    if (!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["password"])){
        $response["message"] = "Campos nome, email e senha devem estar presentes.";
        $response["field"] = "name";
    }
    elseif (!$_POST["name"]){
        $response["message"] = "Campo nome deve estar presente.";
        $response["field"] = "name";
    }
    elseif (!$_POST["email"]){
        $response["message"] = "Campo email deve estar presente.";
        $response["field"] = "email";
    }
    // valida email
    // https://www.php.net/manual/pt_BR/filter.examples.validation.php
    elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
        $response["message"] = "Email inválido.";
        $response["field"] = "email";
    }
    elseif (!$_POST["password"]){
        $response["message"] = "Campo senha deve estar presente.";
        $response["field"] = "password";
    }
    elseif (strlen($_POST["password"]) < 8){
        $response["message"] = "Senha deve possuir no mínimo 8 caracteres.";
        $response["field"] = "password";
    }
    else {
        $response["status"] = "sucesso";
    }

    return $response;
}
