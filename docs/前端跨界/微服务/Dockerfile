FROM centos
MAINTAINER Evilboy <evilboy@qq.com>

RUN yum install gcc automake autoconf libtool make -y
RUN yum install zlib zlib-devel libffi-devel -y
RUN yum install wget -y
RUN wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tgz
RUN tar -zxvf Python-3.7.0.tgz
WORKDIR Python-3.7.0

RUN ./configure
RUN ls -al
RUN make && make install

CMD python3 -m http.server