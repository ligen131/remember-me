package controllers

import (
	"remember-me/utils/logs"

	"github.com/labstack/echo/v4"
)

type People struct {
	Relationship string `yaml:"relationship"`
}

var url string

func PeopleRelationshipInit(p People) {
	url = p.Relationship
}

type PeopleRelationshipResponse struct {
	ImageURL string `json:"image_url"`
}

func PeopleRelationshipGET(c echo.Context) error {
	logs.Debug("GET /people/relationship")

	return ResponseOK(c, PeopleRelationshipResponse{
		ImageURL: url,
	})
}
