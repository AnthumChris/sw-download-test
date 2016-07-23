<?php

$disposition = isset($_GET['inline'])? 'inline' : 'attachment';

// respond with 20 characters to force Nginx to invoke gzip compression
$content = "12345678901234567890";
$length = strlen($content);

header('Content-Type: text/plain; charset=UTF-8');
header('Content-Length: '.$length, true);
header('Content-Disposition: '.$disposition.'; filename="download-test.txt"');

echo $content;
flush();
exit;
