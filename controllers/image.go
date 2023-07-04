package controllers

import (
	"github.com/labstack/echo/v4"
	"remember-me/shared/qiniu"
	"remember-me/utils/logs"
)

type ImageTokenResponse struct {
	Key   string `json:"key"`
	Token string `json:"token"`
	Url   string `json:"url"`
}

func GetImageToken(c echo.Context) error {
	logs.Debug("GET /image/token")

	uploadInfo, err := qiniu.GetUploadToken()
	if err != nil {
		return ResponseInternalServerError(c, "Get image token failed.", err)
	}

	return ResponseOK(c, ImageTokenResponse{
		Key:   uploadInfo.Key,
		Token: uploadInfo.Token,
		Url:   uploadInfo.Url,
	})
}
