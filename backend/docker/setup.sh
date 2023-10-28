#!/bin/sh


service postgresql start &

while ! pg_isready > /dev/null; do
    sleep 1
done

psql -c "CREATE DATABASE trello;"
psql -c "CREATE USER $DATABASE_USER WITH ENCRYPTED PASSWORD '$DATABASE_PASS';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE trello TO $DATABASE_USER;"
psql -c "ALTER USER $DATABASE_USER WITH SUPERUSER;"