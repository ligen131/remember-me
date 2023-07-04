package router

import (
	"remember-me/controllers"

	"github.com/labstack/echo/v4"
	echoMiddleware "github.com/labstack/echo/v4/middleware"
)

func Load(e *echo.Echo) {
	routes(e)
}

func routes(e *echo.Echo) {
	e.Use(echoMiddleware.Recover())
	e.Use(echoMiddleware.CORSWithConfig(echoMiddleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderXRequestedWith, echo.HeaderAuthorization},
	}))

	apiVersionUrl := "/api/v1"

	e.GET(apiVersionUrl+"", controllers.IndexGET)
	e.GET(apiVersionUrl+"/", controllers.IndexGET)

	e.GET(apiVersionUrl+"/health", controllers.HealthGET)

	postGroup := e.Group(apiVersionUrl + "/post")
	{
		postGroup.POST("", controllers.PostPOST)
		postGroup.POST("/", controllers.PostPOST)
		postGroup.GET("", controllers.PostGET)
		postGroup.GET("/", controllers.PostGET)
	}

	askGroup := e.Group(apiVersionUrl + "/ask")
	{
		askGroup.GET("", controllers.AskGET)
		askGroup.GET("/", controllers.AskGET)
	}
	e.GET("/image/token", controllers.GetImageToken)
}
