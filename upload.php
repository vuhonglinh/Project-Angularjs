<?php
$targetDir = "/lib/admin/uploads/";
$targetFile = $targetDir . basename($_FILES["image"]["name"]);
move_uploaded_file($_FILES["image"]["tmp_name"], "test.txt");
echo "123";
