<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

error_reporting(0);

$pdo = new PDO('sqlite:myDatabase.sqlite3');

try {    
  
	$pdo->exec(
	"CREATE TABLE IF NOT EXISTS eggplant_users (
		id INTEGER PRIMARY KEY, 
		name TEXT, 
		birthdate DATE,
		email TEXT,
		children INTEGER)"

	
	);
} catch(PDOException $e) {
    echo $e->getMessage();
}




if ($_POST and $_GET['a']=="add"){
	$data = $_POST;
	$sql = "INSERT INTO eggplant_users (name, birthdate, email, children) VALUES (:name, :birthdate, :email, :children)";
	$stmt= $pdo->prepare($sql);
	$stmt->execute($data);
	$row = array('status' => 'ok');
	print json_encode($row);
	exit;
}
if($_GET['a']="get"){
	
	$limit = 15;


	$query="SELECT COUNT(*) FROM `eggplant_users`";
	$stmt = $pdo->query($query);
	$row = $stmt->fetch();
	$count = $row[0];
	$pages = ceil( $count / $limit );


	$query = "SELECT * FROM eggplant_users LIMIT 0,$limit";
	
	if($_GET['term']!= ""){
		


		$term = $_GET['term'];
		$query_part[] =" WHERE name LIKE '%$term%' or email LIKE '%$term%' ";
	}
	if($_GET['sort']!=""){
		if(stristr($_GET['sort'], "DESC_")){
			$_GET['sort']=str_replace("DESC_", "", $_GET['sort']);
			$SC=" DESC ";	
		}
		$query_part[]= " ORDER by ".$_GET['sort'].$SC;
	}
	
	if($_GET['page']>0){
	
		$start = $limit * $_GET['page'] - $limit;
		$query_part[] = " LIMIT $start, $limit ";
	}


	if(count($query_part) > 0 ){
		$query_add = implode(" ", $query_part);
		$query =" SELECT * FROM eggplant_users $query_add";
	}

	//echo $query;
	$stmt = $pdo->query($query);
	$row = $stmt->fetchAll();
	$results = array('q' => $query, 'pages' => $pages, 'count' => $count, 'users' => $row);
	print json_encode($results);
}




?>

