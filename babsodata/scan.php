<?php

$dir = "datas";

// Run the recursive function 

$response = scan($dir);


// This function scans the files folder recursively, and builds a large array

function scan($dir){

	$files = array();

	// Is there actually such a folder/file?
	if(file_exists($dir)){

		foreach(scandir($dir) as $file) {

			if(!$file || $file[0] == '.') {
				continue; // Ignore hidden files
			}

			if(is_dir($dir . '/' . $file)) { // The path is a folder
				$files[] = array(
					"name" => $file,
					"type" => "folder",
					"path" => $dir . '/' . $file,
					"items" => scan($dir . '/' . $file) // Recursively get the contents of the folder
				);
			}
			else { // It is a file
				$files[] = array(
					"name" => $file,
					"type" => "file",
					"path" => $dir . '/' . $file,
					"size" => filesize($dir . '/' . $file), // Gets the size of this file
                    "date" => date('Y/m/d', filemtime($dir . '/' . $file)),
                    // "content" => file_get_contents($dir . '/' . $file)
				);
			}
		}
	}
	return $files;
}

// Output the directory listing as JSON
header('Content-type: application/json');

echo json_encode(array(
	"name" => "datas",
	"type" => "folder",
	"path" => $dir,
	"items" => $response
));
