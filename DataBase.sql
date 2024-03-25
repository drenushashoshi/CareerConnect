CREATE DATABASE CareerConnect

USE CareerConnect

CREATE TABLE Company(
CompanyID int IDENTITY(1,1) primary key,
Name varchar(50),
Adresa varchar(100),
Phone varchar(50),
Email varchar(50),
Password varchar(50),
Openning_year int,
Description varchar(100)
);

create table Worker(
WorkerID int IDENTITY(1,1) primary key,
Name varchar(50),
Surname varchar(50),
Age int ,
Adress varchar (50),
Email varchar (50),
password varchar (50),
Photo varchar (500),
Phone varchar(20),
JobPreferences varchar(50),
Skills varchar (50),
);

CREATE TABLE Job (
id INT int IDENTITY(1,1) PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
requirements TEXT,
location VARCHAR(100),
company_id INT,
category_id INT,
salary DECIMAL(10, 2),
job_type VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deadline DATE,
FOREIGN KEY (CompanyID) REFERENCES Company(CompanyID),
FOREIGN KEY (category_id) REFERENCES Category(id)
);