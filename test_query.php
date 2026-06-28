<?php
require 'config/database.php';
$stmt = $pdo->query('SELECT * FROM productos ORDER BY id DESC LIMIT 5');
print_r($stmt->fetchAll());
?>
