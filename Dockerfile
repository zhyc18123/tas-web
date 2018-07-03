FROM nginx

LABEL MAINTAINER=wens
# adjust time
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/*

ADD nginx.conf /etc/nginx/conf.d

COPY dist /usr/share/nginx/html/

