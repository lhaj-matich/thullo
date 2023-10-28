#!/bin/sh

chmod -R u=rwx '/var/lib/postgresql/15/main/'
chmod -R 0700 '/etc/postgresql/15/main'
service postgresql start &

while ! pg_isready > /dev/null; do
    sleep 1
done

npx prisma migrate dev
npm start