package main

import (
	"remember-me/controllers/auth"
	"remember-me/model"
	"remember-me/shared/gpt"
	"remember-me/shared/qiniu"
	"remember-me/shared/server"
	"remember-me/shared/yamlconfig"
)

func main() {
	configuration, err := yamlconfig.ConfigLoad("config.yml")
	if err != nil {
		panic(err)
	}

	err = model.Connect(configuration.Database)
	if err != nil {
		panic(err)
	}

	err = model.InitModel()
	if err != nil {
		panic(err)
	}

	err = auth.InitAuthorization(configuration.Authorization)
	if err != nil {
		panic(err)
	}

	gpt.InitGpt(configuration.Gpt)
	err = qiniu.InitQiniu(configuration.Qiniu)
	if err != nil {
		panic(err)
	}

	err = server.Run(configuration.Server)
	if err != nil {
		panic(err)
	}
}
