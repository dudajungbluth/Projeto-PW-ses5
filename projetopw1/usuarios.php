<?php

require "conection.php";

/*$teste = true;
$mensagem  = array();


if($teste == true) {

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM usuarios";

$stmt = $conn->query($sql);

$data = $stmt->fetchAll();

foreach($data as $row) {

echo $row["name"];

}
}

$output = array();
$output = validate();

if ($output["status"] == "erro"){
        echo json_encode($output);
        exit;
}
*/

$output = array();


$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM usuarios";

$stmt = $conn->query($sql);

$data = $stmt->fetchAll();

    if (isset($_POST["email"]) && isset($_POST["password"])){

        $valida = validate_person();
        if ($valida["status"] == "erro"){
            $output = $valida;
        }
        else {
            $email = $_POST["email"];
            $password = $_POST["password"];
    
            // para o caso de não nenhum item corresponder
            $output["status"] = "erro";
            $output["message"] = "Usuário com as credenciais informadas não foi encontrado.";
    
            // busca email
            foreach( as $item){
                $hash = $item["senha"];
                // verifica se senha bate com hash
                // https://www.php.net/manual/pt_BR/function.password-verify.php
                if ($item["email"] == $email && password_verify($password, $hash)){
                    $output["status"] = "sucesso";
                    $output["message"] = "Login realizado com sucesso.";
                    break;
                }
            }
        }
    }

    function validate_person(){
        $response = array();
        $response["status"] = "sucesso";

        if (!$_POST["email"]){
            $response["status"] = "erro";
            $response["message"] = "Campo email deve estar presente.";
        }
        // valida email
        // https://www.php.net/manual/pt_BR/filter.examples.validation.php
        elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
            $response["status"] = "erro";
            $response["message"] = "Email inválido.";
        }
        elseif (!$_POST["password"]){
            $response["status"] = "erro";
            $response["message"] = "Campo senha deve estar presente.";
        }
        elseif (strlen($_POST["password"]) < 8){
            $response["status"] = "erro";
            $response["message"] = "Senha deve possuir no mínimo 8 caracteres.";
        }

        return $response;
    }

    echo json_encode($output);
?>


