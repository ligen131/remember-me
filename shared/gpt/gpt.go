package gpt

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"remember-me/utils/logs"
	"time"

	"go.uber.org/zap"
)

type GptConfig struct {
	ApiToken string `yaml:"api-token"`
	Model    string `yaml:"model"`
	ProxyURL string `yaml:"proxy-url"`
	Prompt   string `yaml:"prompt"`
	TimeOut  int    `yaml:"time-out"`
}

var (
	apiToken string
	model    string
	proxyURL string
	prompt   string
	timeOut  int
)

func InitGpt(config GptConfig) {
	apiToken = config.ApiToken
	model = config.Model
	proxyURL = config.ProxyURL
	prompt = config.Prompt
	timeOut = config.TimeOut
}

type gptReq struct {
	Model    string   `json:"model"`
	Messages []gptMsg `json:"messages"`
}

type gptMsg struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type gptResp struct {
	ID      string       `json:"id"`
	Choices []gptChoices `json:"choices"`
}

type gptChoices struct {
	Message gptMsg `json:"message"`
}

func GptHandle(message string) (string, error) {
	reqBody := gptReq{
		Model: model,
		Messages: []gptMsg{
			{
				Role:    "user",
				Content: prompt + message,
			}},
	}
	logs.Debug("Send to GPT: ", zap.String("content", reqBody.Messages[0].Content))

	reqData, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", proxyURL, bytes.NewBuffer(reqData))
	if err != nil {
		return "", err
	}

	logs.Debug("Send to GPT: ", zap.String("proxy_url", proxyURL))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiToken)
	client := &http.Client{Timeout: time.Duration(timeOut) * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}

	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	if resp.StatusCode != 200 {
		return "", fmt.Errorf("gpt api error: %d %s", resp.StatusCode, respBody)
	}

	respData := &gptResp{}
	err = json.Unmarshal(respBody, respData)
	if err != nil {
		return "", err
	}

	if len(respData.Choices) > 0 {
		return respData.Choices[0].Message.Content, nil
	}
	return "", fmt.Errorf("gpt resp no data: %s", respBody)
}
