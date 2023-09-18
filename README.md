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

Enpoint : PATCH /api/users/:id

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

# Contact API Specificaion

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
	"firstName": "Naufal",
	"lastName": "Adhi",
	"email": "naufal@example.com",
	"phone": "12345678"
}
```

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"firstName": "Naufal",
		"lastName": "Adhi",
		"email": "naufal@example.com",
		"phone": "12345678"
	}
}
```

Response Body Error :

```json
{
	"errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
	"firstName": "Naufal",
	"lastName": "Adhi",
	"email": "naufal@example.com",
	"phone": "12345678"
}
```

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"firstName": "Naufal",
		"lastName": "Adhi",
		"email": "naufal@example.com",
		"phone": "12345678"
	}
}
```

Response Body Error :

```json
{
	"errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"firstName": "Naufal",
		"lastName": "Adhi",
		"email": "naufal@example.com",
		"phone": "12345678"
	}
}
```

Response Body Error :

```json
{
	"errors": "Contact not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by firstName or lastName, using like, optional
- email : Search by email, using like, optional
- phone : Search by phone, using like, optional
- page : Number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
	"data": [
		{
			"id": 1,
			"firstName": "Naufal",
			"lastName": "Adhi",
			"email": "naufal@example.com",
			"phone": "12345678"
		},
		{
			"id": 2,
			"firstName": "Adhi",
			"lastName": "Ramadhan",
			"email": "adhi@example.com",
			"phone": "12345678"
		}
	],
	"paging": {
		"page": 1,
		"totalPage": 4,
		"totalItem": 20
	}
}
```

Response Body Error :

```json
{
	"errors": "Contact not found"
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": "Ok"
}
```

Response Body Error :

```json
{
	"errors": "Contact not found"
}
```

# Address API Specification

## Create Address

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
	"street": "Nama jalan",
	"city": "Nama kota",
	"province": "Nama Provinsi",
	"country": "Nama negara",
	"postalCode": 12345
}
```

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"street": "Nama jalan",
		"city": "Nama kota",
		"province": "Nama Provinsi",
		"country": "Nama negara",
		"postalCode": 12345
	}
}
```

Response Body Error :

```json
{
	"errors": "Country is required"
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
	"street": "Nama jalan",
	"city": "Nama kota",
	"province": "Nama Provinsi",
	"country": "Nama negara",
	"postalCode": 12345
}
```

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"street": "Nama jalan",
		"city": "Nama kota",
		"province": "Nama Provinsi",
		"country": "Nama negara",
		"postalCode": 12345
	}
}
```

Response Body Error :

```json
{
	"errors": "Country is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"street": "Nama jalan",
		"city": "Nama kota",
		"province": "Nama Provinsi",
		"country": "Nama negara",
		"postalCode": 12345
	}
}
```

Response Body Error :

```json
{
	"errors": "Contact not found"
}
```

## List Address

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": [
		{
			"id": 1,
			"street": "Nama jalan",
			"city": "Nama kota",
			"province": "Nama Provinsi",
			"country": "Nama negara",
			"postalCode": 12345
		},
		{
			"id": 2,
			"street": "Nama jalan",
			"city": "Nama kota",
			"province": "Nama Provinsi",
			"country": "Nama negara",
			"postalCode": 12345
		}
	]
}
```

Response Body Error :

```json
{
	"errors": "Contact not found"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": "Ok"
}
```

Response Body Error :

```json
{
	"errors": "Address not found"
}
```
