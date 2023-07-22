CREATE TABLE `Exercises` (
	`ExerciseID` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`Name` varchar(100) NOT NULL,
	`Notes` text,
	`Result` decimal(10,2),
	`Reps` int,
	`Sets` int,
	`Rest` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `GroupMembers` (
	`GroupID` int NOT NULL,
	`UserID` char(50) NOT NULL,
	`Role` varchar(50),
	CONSTRAINT `GroupMembers_GroupID_UserID` PRIMARY KEY(`GroupID`,`UserID`)
);
--> statement-breakpoint
CREATE TABLE `Groups` (
	`GroupID` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`Name` varchar(100),
	`Description` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` char(50) PRIMARY KEY NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`surname` varchar(255) NOT NULL
);
