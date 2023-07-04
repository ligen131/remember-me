package middleware

import (
	"remember-me/controllers"
	"remember-me/controllers/auth"
	"remember-me/model"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func TokenVerificationMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		claims, err := auth.GetClaimsFromHeader(c)
		if err != nil {
			return controllers.ResponseUnauthorized(c, "Invalid bearer token in header.", err)
		}
		if claims.Valid() != nil {
			return controllers.ResponseUnauthorized(c, "Invalid jwt token.", claims.Valid())
		}

		if claims.ExpiresAt < time.Now().Unix() {
			return controllers.ResponseUnauthorized(c, "Token expired.", nil)
		}

		user, err := model.FindUserByID(claims.ID)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return controllers.ResponseUnauthorized(c, "User in token not found.", err)
			}
			return controllers.ResponseInternalServerError(c, "Find user by ID failed.", err)
		}
		if user.ID != claims.ID {
			return controllers.ResponseUnauthorized(c, "UserID does not match OpenID.", err)
		}

		return next(c)
	}
}
