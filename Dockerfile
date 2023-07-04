FROM golang:1.20-alpine3.17 as builder
COPY . /src
WORKDIR /src
ENV GOPROXY "https://goproxy.cn"
RUN go build -o /build/remember-me .

FROM alpine:3.17 as prod
COPY --from=builder /build/remember-me /usr/bin/remember-me
WORKDIR /app
ENTRYPOINT [ "remember-me" ]