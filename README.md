### How to run
Generate GRAYLOG_PASSWORD_SECRET and GRAYLOG_ROOT_PASSWORD_SHA2 environment variables in the .env file using these commands:
```sh
pwgen -N 1 -s 96
echo -n yourpassword | shasum -a 256
```
to run:
```sh
docker-compose up -d
```

### How to set up TSL
- generate the certificate and a key https://archivedocs.graylog.org/en/2.3/pages/configuration/https.html
- place them into graylog-credentials folder
- make the folder accessible by the graylog
```sh
sudo chmod -R 777 graylog-credentials
```
- configure TSL in GELF TCP input config



### Test graylog host
http://165.232.112.76:9000/
username: admin
password: yourpassword

