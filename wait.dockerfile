## Use whatever base image
FROM alpine

## Add the wait script to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

## Otherwise you can directly download the executable from github releases. E.g.:
#  ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
#  RUN chmod +x /wait

## Add your application to the docker image
ADD MySuperApp.sh /MySuperApp.sh

## Launch the wait tool and then your application
CMD /wait && /MySuperApp.sh