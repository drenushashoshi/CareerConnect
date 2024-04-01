package com.example.EmoloyerSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@SpringBootApplication
public class EmoloyerSystemApplication{

	public static void main(String[] args) {
		SpringApplication.run(EmoloyerSystemApplication.class, args);

		String jdbcUrl = "jdbc:mysql://localhost:3306/emoloyeeSystem";
		String username = "root";
		String password = "mysql11";

		try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
			System.out.println("Database connection successful!");
		} catch (SQLException e) {
			System.out.println("Database connection failed:");
			e.printStackTrace();
		}
	}
}
