# Remember-me API Document

ligen131 [i@ligen131.com](mailto:i@ligen131.com)

## Overview

Deployed at <https://api.hust.online/remember-me/api/v1>

**IMPORTANT: In the request marked with `*` in the title, please provide the JWT token obtained by login in the request header.**

```yaml
Authorization: Bearer <token>
```

## Health

### [GET] `/health`

Get service status.

#### Request

None.

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": "ok",
}
```

## Users

`Users` can perform actions such as logging in, uploading `Posts`, viewing past `Posts` and relationships among `Person`.

### [GET] `/user`

Get basic user information by `user_id` or `user_name`.

#### Request

| Parameter   | Required                                                        | Note |
| ----------- | --------------------------------------------------------------- | ---- |
| `user_id`   | Optional, but either `user_id` or `user_name` must be provided. |      |
| `user_name` | Optional, but either `user_id` or `user_name` must be provided. |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "user_id": 1,
    "user_name": "ligen131",
    "person_id": 1
  },
}
```

### [POST] `/user/login`

User login.

#### Request

```json
{
  "user_name": "ligen131",
  "password": "123456"
}
```

| Parameter   | Required | Note |
| ----------- | -------- | ---- |
| `user_name` | Required |      |
| `password`  | Required |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "user_id": 1,
    "user_name": "ligen131",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM...",
    "token_expiration_time": 1683561600,
  },
}
```


- `token`: The JWT token obtained during login. Please include this token in the request header when sending requests related to user permissions.

  ```yaml
  Authorization: Bearer <token>
  ```
- `token_expiration_time`: The token expiration time, the format is Unix timestamp. Since the `refresh_token` interface is not planned to implement temporarily, the expiration time may be very long.

**The Demo version does not implement the user registration interface.**

## Posts

`Posts` are uploaded by `Users`, and then AI automatically recognizes `Person` and `Events` information.

### [POST] `/post`

`Users` upload `Posts`.

#### Request

```json
{
  "user_id": 1,
  "text": "Xiaoming, nice to meet you!",
  "year": 2023,
  "month": 7
}
```

| Parameter | Required | Note |
| --------- | -------- | ---- |
| `user_id` | Required |      |
| `text`    | Required |      |
| `year`    | Required |      |
| `month`   | Required |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "status": "success",
    "post_id": 1,
    "person": [
      {
        "person_id": 2,
        "person_name": "Xiaoming",
        "describe": "friend"
      }
    ],
    "event": [
      {
        "event_id": 1,
        "person_id_list": [1, 2],
        "describe": "Gen Li meets Xiaoming."
      }
    ]
  },
}
```

### [GET] `/post`

Get `Posts` based on constraints.

#### Request

| Parameter   | Required                                                     | Note |
| ----------- | ------------------------------------------------------------ | ---- |
| `post_id`   | Optional                                                     |      |
| `user_id`   | Optional                                                     |      |
| `person_id` | Optional                                                     |      |
| `event_id`  | Optional                                                     |      |
| `year`      | Optional                                                     |      |
| `month`     | Optional. If this is provided, `year` must also be provided. |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "posts": [
      {
        "post_id": 1,
        "user_id": 1,
        "text": "Xiaoming, nice to meet you!",
        "year": 2023,
        "month": 7,
        "person": [
          {
            "person_id": 2,
            "person_name": "Xiaoming",
            "describe": "friend"
          }
        ],
        "event": [
          {
            "event_id": 1,
            "person_id_list": [1, 2],
            "describe": "Gen Li meets Xiaoming."
          }
        ]
      }
    ]
  },
}
```



## Person

This is the person and relationship that AI automatically recognizes through `Posts` uploaded by `Users`.

### [GET] `/person`

Get basic person information by `person_id`.

#### Request

| Parameter   | Required | Note |
| ----------- | -------- | ---- |
| `person_id` | Required |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "person_id": 1,
    "person_name": "Gen Li",
    "post_id_list": [1, 2]
  },
}
```

### [GET] `/person/relationship`

Get the relationship between `Person`.

#### Request

| Parameter   | Required                          | Note |
| ----------- | --------------------------------- | ---- |
| `person_id` | Required                          |      |
| `depth`     | Optional. The default value is 1. |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "person_id": 1,
    "person_name": "Gen Li",
    "relationship": [
      {
        "person_id": 2,
        "person_name": "Xiaoming",
        "describe": "friend"
      },
      {
        "person_id": 3,
        "person_name": "Xiaohong",
        "describe": "sister"
      }
    ]
  },
}
```

## Events

This is the events that AI automatically recognizes through `Posts` uploaded by `Users`.

### [GET] `/event`

Get basic event information by `event_id`.

#### Request

| Parameter  | Required | Note |
| ---------- | -------- | ---- |
| `event_id` | Required |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "event_id": 1,
    "person_id_list": [1, 2],
    "describe": "Gen Li meets Xiaoming."
  },
}
```

### [GET] `/event/list`

Get event list filtered by `person_id` or `user_id`.

#### Request

| Parameter   | Required                                                        | Note |
| ----------- | --------------------------------------------------------------- | ---- |
| `person_id` | Optional, but either `person_id` or `user_id` must be provided. |      |
| `user_id`   | Optional, but either `person_id` or `user_id` must be provided. |      |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "events": [
      {
        "event_id": 1,
        "person_id_list": [1, 2],
        "describe": "Gen Li meets Xiaoming."
      },
      {
        "event_id": 2,
        "person_id_list": [1, 3],
        "describe": "Gen Li meets Xiaohong."
      },
    ]
  },
}
```

## Ask

### [GET] `/ask`

Ask the AI questions.

#### Request

| Parameter | Required | Note                                                                       |
| --------- | -------- | -------------------------------------------------------------------------- |
| `user_id` | Required |                                                                            |
| `prompt`  | Required | This parameter specifies the prompt that the user initiates to ask the AI. |

#### Response

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "answer": ""
  },
}
```

