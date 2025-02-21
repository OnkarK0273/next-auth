# Nextjs fullstack auth implemination

## Tech-stacks
- nextjs14, nodemailer, MongoDB

## Fetures

- Registration, login with jwt token
- User Verification through mail
- User Forgotpassword
- middlewares for secure route

## configeration

### 1. .env file
``
    MONGODB_URL = #
    ACCESS_TOKEN_SECRET = #
    DOMAIN = #
    EMAIL_USER = #
    EMAIL_PASS = #
    EMAIL_FROM = #
``



## Verification mail process

### 1. signup route
- after registering the user send user verification mail through sendEmail helper fun.

### 3. verifyemail page
- after reciving token from email it redirect to this page
- sned token to verification route

### 4. verification route.
- it verify the token
- verfy the token with user's verfifyToken that saved in database
- then update user filed i.e isVarified, verifiytoken and varifyTokenExpiry
- send varified response.

## Forgot Password process

### 1. forgotpassword page
- send user email to verify route to recivie reset pass token

### 2. verify route
- it verifyies the user
- send reset pass token with help of sendEmail helper fun.

### 3. resetpass page
- after reciving token from email it redirect to this page
- fill the password
- send credintial with token to updatepass route

### 4. updatepass route
- it veify the token with user's forgetPasswodToken that saved in database
- update update user filed i.e password, forgetPasswodToken and forgetPasswodTokenExpiry
- send reset response.