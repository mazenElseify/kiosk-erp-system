# Database Design for Kiosk-ERP-System

## Collenction Overview

1. Users
2. Products
3. Suppliers
4. Inventory (Stock)
5. Transactions
6. Invoices

## Users

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier for each user |
| username | String | Unique username for login |
| fullName | String | Name of user |
| role | String | Indentify user role for Authorization |
| phone | String | User phone number |
| email | String | User email |
| password | String | User password for login |
| isActive | Boolean | Identify user is active or not instead of deleting user | 
| createdAt | Date | Date of user creation |
| updatedAt | Date | User updated date | 

## Products

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier for each product |
| supplierIds[] | Array | Array of suppliers |
| name | String | Product name |
| cateegory | String | Product category | 
| purchaseUnit | String | When we make a purchase we bought it in boxes or pieces |
| saleUnit | String | When we make a sale we sell in piece |
| unitsPerBox | Number | Box contains how many piece | 
| purchasePricePerBox | Number | Price per box (puchase price) |
| salePricePerPiece | Number | Price per piece (sell price) |
| createdAt | Date | Date of user creation |
| updatedAt | Date | User updated date | 


## Suppliers

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier for supplier |
| name | String | Name of supplier | 
| description | String | Describes the good that this supplier is offering |
| phone | String | Supplier phone number |
| email | String | Supplier email (not important) |
| createdAt | Date | Date of user creation |
| updatedAt | Date | User updated date | 

## Inventory

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier for stock added |
| productId | ObjectId | Product identifier |
| totalBoxes | Number | Total boxes available in stock |
| totalPieces | Number | Total pieces available in stock |
| loosePieces | Number | Opened boxes pieces |
| damagedPieces | Number | Pieces damaged of the product |
| createdAt | Date | Date of user creation |
| updatedAt | Date | User updated date | 


## Transactions

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier for each transaction made |
| type | String | type of transaction (purchase or sale ) |
| items[] | Array | Array to carry all items |
| items[].productId | ObjectId | Unique identifier for the product |
| items[].boxPrice | Number | Price of product box |
| items[].unitPrice | Number | Price of product piece |
| items[].quantity | Number | Quantity of the product |
| items[].total | Number | Total price for item |
| totalPrice | Number | Total Price of transaction |
| supplierId | ObjectId | Identifier for supplier if the transaction type is purchase |
| customerName | String | constant "walk_in" |
| createdAt | Date | Date of user creation |
| updatedAt | Date | User updated date | 



## Invoices

| Field | Type | Description |
|-------|------|-------------|
