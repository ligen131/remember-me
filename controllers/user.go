package controllers

// Demo version not supported `Users`.

// func FindUser(c echo.Context, request model.User) (user model.User, err error, isInternalServerError bool) {
// 	user = request
// 	if request.ID != 0 {
// 		user, err = model.FindUserByID(request.ID)
// 	} else if request.OpenID != "" {
// 		user, err = model.FindUserByOpenID(request.OpenID)
// 	} else {
// 		return user, errors.New("User ID or openid is required."), false
// 	}
// 	if err != nil {
// 		if err == gorm.ErrRecordNotFound {
// 			return user, err, false
// 		}
// 		return user, ResponseInternalServerError(c, "Find user failed", err), true
// 	}
// 	return user, nil, false
// }

// func UserRegister(openID string) (model.User, error) {
// 	err := checkUserOpenID(openID)
// 	if err != nil {
// 		return model.User{}, err
// 	}

// 	return model.UserRegister("", openID)
// }

// type UserLoginRequest struct {
// 	Code string `json:"code"`
// }

// type UserLoginResponse struct {
// 	ID                  uint32 `json:"user_id"`
// 	OpenID              string `json:"openid"`
// 	UserName            string `json:"user_name"`
// 	AccessToken         string `json:"token"`
// 	AccessTokenExpireAt int64  `json:"token_expiration_time"`
// }

// func UserLoginPOST(c echo.Context) error {
// 	logs.Debug("POST /user/login")

// 	userRequest := UserLoginRequest{}
// 	_ok, err := Bind(c, &userRequest)
// 	if !_ok {
// 		return err
// 	}

// 	wxLoginResp, err := miniprogram.WxLogin(userRequest.Code)
// 	if err != nil {
// 		return ResponseInternalServerError(c, "GET api.weixin.qq.com failed.", err)
// 	}
// 	if wxLoginResp.ErrCode != 0 {
// 		return ResponseBadRequest(c, wxLoginResp.ErrorMessage, err)
// 	}

// 	user, err, e500 := FindUser(c, model.User{
// 		OpenID: wxLoginResp.OpenID,
// 	})
// 	if e500 {
// 		return err
// 	}
// 	if err == gorm.ErrRecordNotFound {
// 		// Login for the first time -> register (create new user)
// 		user, err = UserRegister(wxLoginResp.OpenID)
// 		if err != nil {
// 			return ResponseInternalServerError(c, "Create new user failed.", err)
// 		}
// 	} else if err != nil {
// 		return ResponseInternalServerError(c, "Find user failed.", err)
// 	}

// 	if user.Deleted {
// 		return ResponseBadRequest(c, "This user has been deleted.", nil)
// 	}

// 	accessTokenString, accessTokenExpireAt, err := auth.GenerateAccessToken(&user)
// 	if err != nil {
// 		return ResponseInternalServerError(c, "Generate access token failed.", err)
// 	}

// 	return ResponseOK(c, UserLoginResponse{
// 		ID:                  user.ID,
// 		UserName:            user.UserName,
// 		AccessToken:         accessTokenString,
// 		AccessTokenExpireAt: accessTokenExpireAt.Unix(),
// 	})
// }

// func UserIsAuthGET(c echo.Context) error {
// 	logs.Debug("GET /user/isauth")

// 	return ResponseOK(c, StatusMessage{
// 		Status: "OK",
// 	})
// }

// type UserGETResponse struct {
// 	ID       uint32 `json:"user_id"   `
// 	OpenID   string `json:"openid"     `
// 	UserName string `json:"user_name" `
// }

// func UserGET(c echo.Context) error {
// 	logs.Debug("GET /user")

// 	userRequest := model.User{}
// 	num, _ := strconv.ParseUint(c.QueryParam("user_id"), 10, 32)
// 	userRequest.ID = uint32(num)
// 	userRequest.OpenID = c.QueryParam("openid")

// 	user, err, e500 := FindUser(c, model.User{
// 		ID:     userRequest.ID,
// 		OpenID: userRequest.OpenID,
// 	})
// 	if e500 {
// 		return err
// 	}
// 	if err != nil {
// 		return ResponseBadRequest(c, "Find user failed.", err)
// 	}

// 	return ResponseOK(c, UserGETResponse{
// 		ID:       user.ID,
// 		UserName: user.UserName,
// 		OpenID:   user.OpenID,
// 	})
// }
