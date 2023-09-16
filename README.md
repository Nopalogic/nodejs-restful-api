# User API Spesification

## Register User API

Endpoint : POST /api/users/register

Request Body :

```json
{
	"username": "nopalogic",
	"password": "user12345",
	"name": "Naufal Adhi Ramadhan"
}
```

Request Body Success :

```json
{
	"data": {
		"username": "nopalogic",
		"name": "Naufal Adhi Ramadhan"
	}
}
```

Request Body Error :

```json
{
	"errors": "Username already exists"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
	"username": "nopalogic",
	"password": "user12345"
}
```

Response Body Success :

```json
{
	"data": {
		"token": "unique-token"
	}
}
```

Response Body Error :

```json
{
	"errors": "Username or password wrong"
}
```

## Update User API

Enpoint : PATCH /api/users/id

Headers :

- Authorization : token

Request Body :

```json
{
	"name": "Naufal Adhi", //optional
	"password": "new passoword" //optional
}
```

Response Body Success :

```json
{
	"data": {
		"username": "nopalogic",
		"name": "Naufal Adhi"
	}
}
```

Response Body Error :

```json
{
	"errors": "name length more then 100 character"
}
```

## Get User API

Endpoint : GET /api/users/id

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": {
		"username": "nopalogic",
		"name": "Naufal Adhi"
	}
}
```

Response Body Error :

```json
{
	"errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": "User has been logout"
}
```

Response Body Error :

```json
{
	"errors": "Unauthorized"
}
```
