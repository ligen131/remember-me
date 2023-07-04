package controllers

import (
	"remember-me/utils/logs"

	"github.com/labstack/echo/v4"
)

func HealthGET(c echo.Context) error {
	logs.Debug("GET /health")

	return ResponseOK(c, "ok")
}
