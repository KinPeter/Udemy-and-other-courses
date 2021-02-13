# use an existing image as a base
FROM alpine

# download and install a dependency
RUN apk add --update redis

# tell the img what to do when it starts as a container
CMD ["redis-server"]