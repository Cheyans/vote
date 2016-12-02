FROM mysql:5.7.12

RUN mkdir -p /etc/mysql
ADD conf.d /etc/mysql/conf.d

ADD db-structure.sql /docker-entrypoint-initdb.d
