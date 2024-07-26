USE [test]
-------------------------------------------Table 1--------------------------------------------------

CREATE TABLE FinalProject_AddUser_GC(
		Id INT PRIMARY KEY IDENTITY(1, 1) ,
------------------------------------------------------------------------------------------------
		FirstName NVARCHAR(50) NOT NULL,
		-- to check first name doesn't contain any numeric character
		CONSTRAINT CheckNumericFN1 CHECK (FirstName NOT LIKE '%[0-9]%'),
		-- to check for any special character in first name
		CONSTRAINT CheckSpecialFN1 CHECK (FirstName NOT LIKE '%[^A-Za-z0-9]%'),
------------------------------------------------------------------------------------------------
		 LastName NVARCHAR(50) NOT NULL,
		-- to check for numeric character in last name
		CONSTRAINT CheckNumericLN1 CHECK (LastName NOT LIKE '%[0-9]%'),
		-- to check for special character in last name
		CONSTRAINT CheckSpecialLN1 CHECK (LastName NOT LIKE '%[^A-Za-z0-9]%'),
		
------------------------------------------------------------------------------------------------
		MiddleName NVARCHAR(50) NOT NULL,
		CONSTRAINT CheckNumericMN1 CHECK (MiddleName NOT LIKE '%[0-9]%'),
		-- to check for special character in Middle name
		CONSTRAINT CheckSpecialMN1 CHECK (MiddleName NOT LIKE '%[^A-Za-z0-9]%'),
		Gender NVARCHAR(10) NOT NULL,
------------------------------------------------------------------------------------------------
		DateOfJoining DATE NOT NULL,
		CONSTRAINT CheckDateOfJoin CHECK (DateOfJoining <= GetDate()),
		DateOfBirth DATE NOT NULL,
		CONSTRAINT ChkDateOfBirth CHECK (DateOfBirth < GetDate()),
-------------------------------------------------------------------------------------------------
		EmailId varchar(40) NOT NULL UNIQUE,
		PhoneNumber varchar(20) NOT NULL,
		CONSTRAINT Phno CHECK (PhoneNumber LIKE '%[0-9]%'),
		AlternatePhone varchar(20) NOT NULL,
		CONSTRAINT AlternatePhone CHECK (AlternatePhone LIKE '%[0-9]%'),
------------------------------------------------------------------------------------------------
		Password VARCHAR(20) NOT NULL,
		CONSTRAINT PasswordLen CHECK (LEN(Password) >= 8),
	-- check for password must include a capital letter, a small letter, a numeric character and a special character
		CONSTRAINT PasswordUpper1 CHECK (Password LIKE '%[A-Z]%'),
		CONSTRAINT PasswordLower1 CHECK (Password LIKE '%[a-z]%'),
		CONSTRAINT PasswordSpecial1 CHECK (Password LIKE '%[^A-Za-z0-9]%')
----------------------------------------------------------------------------------------------------
);
drop table FinalProject_AddUser_GC;
drop table FP_AddressType_GC;
drop table FP_Address_GC;
-------------------------------------------Table 2--------------------------------------------------

CREATE TABLE FP_AddressType_GC(
		Id int primary key identity(1, 1),
		AddressType varchar(10) not null
) 
insert into FP_AddressType_GC values
('primary'),
('secondary')
select * from FinalProject_AddUser_GC

-------------------------------------------Table 3--------------------------------------------------

CREATE TABLE  FP_Address_GC(
------------------------------------------------------------------------------------------------
		Id int primary key identity(1, 1),
		UserId int not null,
		CONSTRAINT UserValidate CHECK (UserId LIKE '%[0-9]%'),
		AddId int not null,
		CONSTRAINT AddValidate CHECK (AddId LIKE '%[0-9]%'),
------------------------------------------------------------------------------------------------
		Address varchar(80) not null,
		City varchar(40) not null,
		CONSTRAINT CityvalidateUpper CHECK (Country LIKE '%[A-Z]%'),
		CONSTRAINT CityvalidateLower CHECK (Country LIKE '%[a-z]%'),
		State varchar(40) not null,
		CONSTRAINT StatevalidateUpper CHECK (Country LIKE '%[A-Z]%'),
		CONSTRAINT StatevalidateLower CHECK (Country LIKE '%[a-z]%'),
		Country varchar(40) not null,
		CONSTRAINT CountryvalidateUpper CHECK (Country LIKE '%[A-Z]%'),
		CONSTRAINT CountryvalidateLower CHECK (Country LIKE '%[a-z]%'),
------------------------------------------------------------------------------------------------
		ZipCode int not null,
		CONSTRAINT ZipValidate CHECK (ZipCode LIKE '%[0-9]%'),
		FOREIGN KEY (UserId) REFERENCES FinalProject_AddUser_GC(Id),
		FOREIGN KEY (AddId) REFERENCES FP_AddressType_GC(Id)
)
select * from FP_Address_GC
-------------------------------------------SP--------------------------------------------------

CREATE or ALTER PROCEDURE Insert_SP_GC
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @MiddleName NVARCHAR(50),
    @Gender NVARCHAR(10),
    @DateOfJoining DATE,
    @DateOfBirth DATE,
    @EmailId VARCHAR(20),
    @PhoneNumber VARCHAR(20),
    @AlternatePhone VARCHAR(20),
    @Password NVARCHAR(255),
	@Address NVARCHAR(20),
	@City NVARCHAR(20),
	@Country NVARCHAR(20),
	@State NVARCHAR(20),
	@ZipCode INT,
	@Address1 NVARCHAR(20),
	@City1 NVARCHAR(20),
	@Country1 NVARCHAR(20),
	@State1 NVARCHAR(20),
	@ZipCode1 INT
AS
BEGIN
	    DECLARE @UserId int;
    -- Insert the new employee record
    INSERT INTO FinalProject_AddUser_GC (FirstName, LastName, MiddleName, Gender, DateOfJoining, DateOfBirth, EmailId, PhoneNumber, AlternatePhone, Password)
    VALUES (@FirstName, @LastName, @MiddleName, @Gender, @DateOfJoining, @DateOfBirth, @EmailId, @PhoneNumber, @AlternatePhone, Password);
	SET @UserId = SCOPE_IDENTITY();
INSERT INTO  FP_Address_GC(UserId, AddId, Address, City, State, Country, ZipCode)
VALUES (@UserId, 1, @Address, @City, @State, @Country, @ZipCode);

IF @Address1 IS NOT NULL
BEGIN
INSERT INTO  FP_Address_GC(UserId, AddId, Address, City, State, Country, ZipCode)
VALUES (@UserId, 2, @Address1, @City1, @State1, @Country1, @ZipCode1);
END

END;
-------------------------------------------Execution--------------------------------------------------
EXEC Insert_SP_GC 
    @FirstName = 'John',
    @LastName = 'Doe',
    @MiddleName = 'A',
    @Gender = 'Male',
    @DateOfJoining = '2024-01-01',
    @DateOfBirth = '1990-01-01',
    @EmailId = 'SDen.e@ample.com',
    @PhoneNumber = '123-456-7891',
    @AlternatePhone = '098-765-4321',
    @Password = 'Pass@1vradhi',
	@Address = '119c bella homes',
	@City = 'Derabassi, Mohali',
	@State = 'Pubjab',
	@Country = 'India',
	@ZipCode = 140507,
	@Address1 = 'asdfaf',
	@City1 = 'adfad',
	@State1 = 'dafd',
	@Country1 = 'adfa',
	@ZipCode1 = 123445;