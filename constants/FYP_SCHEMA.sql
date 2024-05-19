-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: fyp
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `batch`
--

DROP TABLE IF EXISTS `batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch` (
  `BatchID` int NOT NULL AUTO_INCREMENT,
  `BatchName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BatchID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch`
--

LOCK TABLES `batch` WRITE;
/*!40000 ALTER TABLE `batch` DISABLE KEYS */;
INSERT INTO `batch` VALUES (1,'Fall 2020'),(2,'Fall 2021');
/*!40000 ALTER TABLE `batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campus` (
  `CampusID` int NOT NULL AUTO_INCREMENT,
  `CampusName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CampusID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus`
--

LOCK TABLES `campus` WRITE;
/*!40000 ALTER TABLE `campus` DISABLE KEYS */;
INSERT INTO `campus` VALUES (1,'Old Campus'),(2,'Canal Campus');
/*!40000 ALTER TABLE `campus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `CourseID` int NOT NULL AUTO_INCREMENT,
  `CourseCode` varchar(45) NOT NULL,
  `CourseName` varchar(255) NOT NULL,
  `CreditHours` int NOT NULL,
  PRIMARY KEY (`CourseID`),
  UNIQUE KEY `CourseCode_UNIQUE` (`CourseCode`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'CS101','Introduction to Maths',3),(2,'CS102','Introduction to NLP',3),(3,'CS112','Introduction to Data Science',3);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courseoffering`
--

DROP TABLE IF EXISTS `courseoffering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courseoffering` (
  `courseOfferingID` int NOT NULL AUTO_INCREMENT,
  `department` int NOT NULL,
  `session` int NOT NULL,
  `batch` int NOT NULL,
  `section` int NOT NULL,
  `campus` int NOT NULL,
  `course` int NOT NULL,
  PRIMARY KEY (`courseOfferingID`),
  KEY `department_idx` (`department`),
  KEY `batch_idx` (`batch`),
  KEY `session_idx` (`session`),
  KEY `section_idx` (`section`),
  KEY `campus_idx` (`campus`),
  KEY `course_idx` (`course`),
  CONSTRAINT `batch` FOREIGN KEY (`batch`) REFERENCES `batch` (`BatchID`),
  CONSTRAINT `campus` FOREIGN KEY (`campus`) REFERENCES `campus` (`CampusID`),
  CONSTRAINT `course` FOREIGN KEY (`course`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `department` FOREIGN KEY (`department`) REFERENCES `department` (`DepartmentID`),
  CONSTRAINT `section` FOREIGN KEY (`section`) REFERENCES `section` (`SectionID`),
  CONSTRAINT `session` FOREIGN KEY (`session`) REFERENCES `session` (`SessionID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseoffering`
--

LOCK TABLES `courseoffering` WRITE;
/*!40000 ALTER TABLE `courseoffering` DISABLE KEYS */;
INSERT INTO `courseoffering` VALUES (1,1,1,1,2,1,2);
/*!40000 ALTER TABLE `courseoffering` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courseregistration`
--

DROP TABLE IF EXISTS `courseregistration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courseregistration` (
  `CourseRegistrationID` int NOT NULL AUTO_INCREMENT,
  `SemesterRegistrationID` int DEFAULT NULL,
  `TeacherID` int DEFAULT NULL,
  `MidPercentage` decimal(10,0) DEFAULT NULL,
  `FinalPercentage` decimal(10,0) DEFAULT NULL,
  `SessionalPercentage` decimal(10,0) DEFAULT NULL,
  `CourseOfferingID` int DEFAULT NULL,
  PRIMARY KEY (`CourseRegistrationID`),
  KEY `SemesterRegistrationID` (`SemesterRegistrationID`),
  KEY `TeacherID` (`TeacherID`),
  KEY `courseoffering_idx` (`CourseOfferingID`),
  CONSTRAINT `courseoffering` FOREIGN KEY (`CourseOfferingID`) REFERENCES `courseoffering` (`courseOfferingID`),
  CONSTRAINT `courseregistration_ibfk_1` FOREIGN KEY (`SemesterRegistrationID`) REFERENCES `semesterregistration` (`SemesterRegistrationID`),
  CONSTRAINT `courseregistration_ibfk_4` FOREIGN KEY (`TeacherID`) REFERENCES `teachers` (`TeacherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseregistration`
--

LOCK TABLES `courseregistration` WRITE;
/*!40000 ALTER TABLE `courseregistration` DISABLE KEYS */;
/*!40000 ALTER TABLE `courseregistration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursesessionalstable`
--

DROP TABLE IF EXISTS `coursesessionalstable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursesessionalstable` (
  `SessionalID` int NOT NULL AUTO_INCREMENT,
  `CourseRegistrationID` int DEFAULT NULL,
  `SessionalName` varchar(255) DEFAULT NULL,
  `ObtainedMarks` int DEFAULT NULL,
  `TotalMarks` int DEFAULT NULL,
  `Weightage` int DEFAULT NULL,
  PRIMARY KEY (`SessionalID`),
  KEY `CourseRegistrationID` (`CourseRegistrationID`),
  CONSTRAINT `coursesessionalstable_ibfk_1` FOREIGN KEY (`CourseRegistrationID`) REFERENCES `courseregistration` (`CourseRegistrationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursesessionalstable`
--

LOCK TABLES `coursesessionalstable` WRITE;
/*!40000 ALTER TABLE `coursesessionalstable` DISABLE KEYS */;
/*!40000 ALTER TABLE `coursesessionalstable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `DepartmentID` int NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DepartmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'DS'),(2,'SE');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `GradeID` int NOT NULL AUTO_INCREMENT,
  `SessionID` int DEFAULT NULL,
  `GradeName` varchar(5) DEFAULT NULL,
  `MinPercentage` decimal(10,0) DEFAULT NULL,
  `MaxPercentage` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`GradeID`),
  KEY `SessionID` (`SessionID`),
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`SessionID`) REFERENCES `session` (`SessionID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `loginId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`loginId`),
  KEY `role_idx` (`role`),
  CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `roles` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (2,'asad','$2b$10$yv2Da8aYwMxPx1OuhTs8C.pmz92NOpGmNzUdyMyNE0tfTSG6ZLUwq',1),(3,'asad4','$2b$10$v6onFyc03Whi6LbZnCcaLu2KB8bV2GzaNF4STL2bP.ZMuz6G573dS',1),(4,'asad890','$2b$10$Ek0fQmux7AeWj3v.V/c5TOb79ILtmm6aLq3I2OJUqFH1GaAxDeVzm',1),(7,'2024007','$2b$10$Nx1Zcjs6942SuHElB0lu1erJ9d/dBycsxZIsYKuJVk88mbUARZ1Ha',1),(8,'98998898','$2b$10$oC6GhkvxTu.y8axrlLZWrunxIwaOutqSnOAkvGS8MIXtxpj7k9cWi',1),(9,'2024083','$2b$10$HFJrbdzXjTaHGSWjmFgLy.0UWk/YMXnnNGvnilMTTSmAs2i0AokIu',1);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap`
--

DROP TABLE IF EXISTS `roadmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap` (
  `idroadmap` int NOT NULL AUTO_INCREMENT,
  `CourseID` int NOT NULL,
  `Pre_req_ID` int DEFAULT NULL,
  PRIMARY KEY (`idroadmap`),
  KEY `courseID_idx` (`CourseID`),
  KEY `Pre_req_ID_idx` (`Pre_req_ID`),
  CONSTRAINT `courseID` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `Pre_req_ID` FOREIGN KEY (`Pre_req_ID`) REFERENCES `course` (`CourseID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap`
--

LOCK TABLES `roadmap` WRITE;
/*!40000 ALTER TABLE `roadmap` DISABLE KEYS */;
INSERT INTO `roadmap` VALUES (2,2,3);
/*!40000 ALTER TABLE `roadmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'studentzzzzzzzz'),(2,'teacher');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `SectionID` int NOT NULL AUTO_INCREMENT,
  `SectionName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SectionID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'Morning'),(2,'Afternoon'),(3,'Dopehr');
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semesterregistration`
--

DROP TABLE IF EXISTS `semesterregistration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semesterregistration` (
  `SemesterRegistrationID` int NOT NULL AUTO_INCREMENT,
  `StudentID` int NOT NULL,
  `SemesterNumber` int NOT NULL,
  `SessionID` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`SemesterRegistrationID`),
  UNIQUE KEY `StudentID_UNIQUE` (`StudentID`),
  KEY `SessionID` (`SessionID`),
  KEY `status_idx` (`status`),
  CONSTRAINT `semesterregistration_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `students` (`StudentID`),
  CONSTRAINT `semesterregistration_ibfk_2` FOREIGN KEY (`SessionID`) REFERENCES `session` (`SessionID`),
  CONSTRAINT `status` FOREIGN KEY (`status`) REFERENCES `statuses` (`statusID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semesterregistration`
--

LOCK TABLES `semesterregistration` WRITE;
/*!40000 ALTER TABLE `semesterregistration` DISABLE KEYS */;
INSERT INTO `semesterregistration` VALUES (4,6,5,1,1),(6,9,5,1,1),(7,10,2,1,1);
/*!40000 ALTER TABLE `semesterregistration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `SessionID` int NOT NULL AUTO_INCREMENT,
  `SessionName` varchar(255) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  PRIMARY KEY (`SessionID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (1,'10','2024-05-09','2025-08-09');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `statusID` int NOT NULL AUTO_INCREMENT,
  `statusName` varchar(45) NOT NULL,
  PRIMARY KEY (`statusID`),
  UNIQUE KEY `statusName_UNIQUE` (`statusName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (1,'active'),(3,'frozen'),(2,'suspended');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `StudentID` int NOT NULL AUTO_INCREMENT,
  `RollNo` varchar(45) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Age` int NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `PhoneNo` varchar(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `BatchID` int NOT NULL,
  `CampusID` int NOT NULL,
  `SectionID` int NOT NULL,
  `DepartmentID` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `login` int DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  UNIQUE KEY `RollNo_UNIQUE` (`RollNo`),
  KEY `BatchID_idx` (`BatchID`),
  KEY `DepartmentID_idx` (`DepartmentID`),
  KEY `SectionID_idx` (`SectionID`),
  KEY `CampusID_idx` (`CampusID`),
  KEY `login_idx` (`login`),
  CONSTRAINT `BatchID` FOREIGN KEY (`BatchID`) REFERENCES `batch` (`BatchID`),
  CONSTRAINT `CampusID` FOREIGN KEY (`CampusID`) REFERENCES `campus` (`CampusID`),
  CONSTRAINT `DepartmentID` FOREIGN KEY (`DepartmentID`) REFERENCES `department` (`DepartmentID`),
  CONSTRAINT `login` FOREIGN KEY (`login`) REFERENCES `login` (`loginId`),
  CONSTRAINT `SectionID` FOREIGN KEY (`SectionID`) REFERENCES `section` (`SectionID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (6,'2024007','Jhooonnn','Snooww',20,'Male','New York','USA','123-456-7890','123 Main St',1,1,1,1,'active',7),(9,'98998898','John','Doe',20,'Male','New York','USA','123-456-7890','123 Main St',1,1,1,1,'active',8),(10,'2024083','Jhooonnn','Snooww',20,'Male','New York','USA','123-456-7890','123 Main St',1,1,1,1,'active',9);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supervisor`
--

DROP TABLE IF EXISTS `supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supervisor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacherId` int DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId_idx` (`teacherId`),
  KEY `departmentId_idx` (`departmentId`),
  CONSTRAINT `deptId` FOREIGN KEY (`departmentId`) REFERENCES `department` (`DepartmentID`),
  CONSTRAINT `teacherId` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`TeacherID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supervisor`
--

LOCK TABLES `supervisor` WRITE;
/*!40000 ALTER TABLE `supervisor` DISABLE KEYS */;
INSERT INTO `supervisor` VALUES (1,1,2);
/*!40000 ALTER TABLE `supervisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `TeacherID` int NOT NULL AUTO_INCREMENT,
  `TeacherCode` varchar(255) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `PhoneNo` varchar(20) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `DepartmentID` int DEFAULT NULL,
  `login` int DEFAULT NULL,
  PRIMARY KEY (`TeacherID`),
  UNIQUE KEY `TeacherCode_UNIQUE` (`TeacherCode`),
  KEY `DepartmentID` (`DepartmentID`),
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`DepartmentID`) REFERENCES `department` (`DepartmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'TCH123','John','Doe',35,'Male','+1234567890','john.doe@example.com',1,NULL),(3,'TCH126','John','Doe',35,'Male','+1234567890','john.doe@example.com',1,NULL);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transcript`
--

DROP TABLE IF EXISTS `transcript`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transcript` (
  `TranscriptID` int NOT NULL AUTO_INCREMENT,
  `StudentID` int NOT NULL,
  `SemesterNumber` int NOT NULL,
  `CourseID` int NOT NULL,
  `CourseGrade` varchar(5) NOT NULL,
  `SemesterGPA` varchar(5) DEFAULT NULL,
  `CourseMarks` decimal(10,0) DEFAULT NULL,
  `CGPA` decimal(10,0) DEFAULT NULL,
  `CourseRegID` int DEFAULT NULL,
  PRIMARY KEY (`TranscriptID`),
  KEY `StudentID` (`StudentID`),
  KEY `CourseID` (`CourseID`),
  KEY `courseRegID_idx` (`CourseRegID`),
  CONSTRAINT `courseRegID` FOREIGN KEY (`CourseRegID`) REFERENCES `courseregistration` (`CourseRegistrationID`),
  CONSTRAINT `transcript_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `students` (`StudentID`),
  CONSTRAINT `transcript_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transcript`
--

LOCK TABLES `transcript` WRITE;
/*!40000 ALTER TABLE `transcript` DISABLE KEYS */;
/*!40000 ALTER TABLE `transcript` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:34:18
