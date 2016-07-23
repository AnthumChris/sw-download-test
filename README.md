https://sw-download-test.anthum.com/

This website exemplifies a file download error in Firefox when using Service Worker and gzip.  Originally intended for the Firefox team to test and evaluate validity of possible bug.

# Deployment Server Configuration
Deployment server uses Nginx and PHP-FPM serving HTTPS over HTTP/1, not HTTP/2

#### /etc/nginx/conf.d/sw-download-test.conf
```
server {
  listen 80;
  listen [::]:80;

  # Don't use HTTP2. Remove it from the troubleshooting equation
  listen 443 ssl;
  listen [::]:443 ssl;

  server_name sw-download-test.anthum.com;

  ssl_certificate      ssl/anthum.com.chained.crt;
  ssl_certificate_key  ssl/anthum.com.key;

  access_log /var/log/nginx/sw-download-test.access.log;
  error_log  /var/log/nginx/sw-download-test.error.log;

  root    /var/www/vhost/sw-download-test;

  # Automatically set UTF-8
  charset_types  text/plain;
  charset UTF-8;

  # Enable gzip unless explicitly disabled
  gzip on;
  gzip_types text/plain;

  # Process PHP files, but disable gzip
  location ~ -no-gzip\.php$ {
    gzip off;

    include      conf.d/includes/php-rules.conf;
  }

  # Process PHP files
  location ~ \.php$ {
    include      conf.d/includes/php-rules.conf;
  }
}
```

#### /etc/nginx/conf.d/includes/php-rules.conf
```
try_files $uri =404;
fastcgi_split_path_info ^(.+\.php)(/.+)$;
fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
fastcgi_index index.php;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
include fastcgi_params;
```
