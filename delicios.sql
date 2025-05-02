-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: delicios
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `category` varchar(255) DEFAULT NULL,
  `isVeg` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Biryani',325.00,'pictures\\biryani.webp','2025-04-27 08:39:07','Mutton Biryani','Indian',0),(4,'Pizza',159.00,'pictures\\pizza.webp','2025-04-27 14:34:01','pizza','Italian',1),(5,'MOMOs',325.00,'pictures\\momos.jpg','2025-04-28 04:23:58','momos spicy','Italian',1),(6,'Butter Chicken',220.00,'pictures\\butter-chicken.jpg','2025-04-28 04:25:18','Butter chicken','Indian',0);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address` text NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `items` json NOT NULL,
  `payment_method` enum('cod','upi','card') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'Old Ponnur, Guntur','522124','[{\"name\": \"Pizza\", \"image\": \"pictures\\\\pizza.webp\", \"price\": 159, \"quantity\": 1}]','cod',206.95,'Pending','2025-05-02 07:31:18'),(2,1,'Old Ponnur, Guntur','522124','[{\"name\": \"Pizza\", \"image\": \"pictures\\\\pizza.webp\", \"price\": 159, \"quantity\": 2}]','cod',373.90,'Pending','2025-05-02 07:35:18'),(3,1,'14-17-15f,Old Ponnur, Guntur','522124','[{\"name\": \"Pizza\", \"quantity\": 1}, {\"name\": \"MOMOs\", \"quantity\": 1}]','cod',548.20,'Pending','2025-05-02 07:36:59'),(4,1,'Old Ponnur, Guntur','522124','[{\"name\": \"Biryani\", \"quantity\": 1}]','cod',381.25,'Pending','2025-05-02 07:45:58'),(5,5,'old guntur, Guntur','522124','[{\"name\": \"Pizza\", \"quantity\": 1}, {\"name\": \"Butter Chicken\", \"quantity\": 1}]','cod',437.95,'Pending','2025-05-02 07:49:56'),(6,6,'Annapurna nagar,5/7, Guntur','522004','[{\"name\": \"Pizza\", \"quantity\": 2}, {\"name\": \"Biryani\", \"quantity\": 1}]','cod',715.15,'Pending','2025-05-02 08:02:52'),(7,2,'Poonur, Guntur','522124','[{\"name\": \"Pizza\", \"quantity\": 1}, {\"name\": \"Biryani\", \"quantity\": 1}]','cod',497.38,'Pending','2025-05-02 08:19:44'),(8,1,'Ponnur, Guntur, Andhra Pradesh, 522124, India, Guntur','522124','[{\"name\": \"MOMOs\", \"quantity\": 1}, {\"name\": \"Pizza\", \"quantity\": 1}]','cod',497.38,'Pending','2025-05-02 11:35:29'),(9,1,'Ponnur, Guntur, Andhra Pradesh, 522124, India, Guntur','522124','[{\"name\": \"Pizza\", \"quantity\": 1}]','cod',206.95,'Pending','2025-05-02 11:50:09'),(10,1,'Ponnur, Guntur, Andhra Pradesh, 522124, India, Guntur','522124','[{\"name\": \"Pizza\", \"quantity\": 1}]','cod',190.25,'Pending','2025-05-02 11:54:16'),(11,1,'Ponnur, Guntur, Andhra Pradesh, 522124, India, Guntur','522124','[{\"name\": \"Pizza\", \"quantity\": 1}]','cod',190.25,'Pending','2025-05-02 12:01:45'),(12,2,'Ponnur, Guntur, Andhra Pradesh, 522124, India, Guntur','522124','[{\"name\": \"Pizza\", \"quantity\": 1}]','cod',190.25,'Pending','2025-05-02 12:11:58');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Karthik Kakumanu','8897925715','$2b$10$hL1pTLRrwwcs482ULOPCeOgykC5J9gaa6y2xxfMfsLDQc996NkVE.','2025-04-27 08:25:38'),(2,'Kakumanu Anjali Durga','8897928054','$2b$10$ylnkqnATOGr2QBu.VhKvfufxv27KpMEgz50zf8Qd2CRvEsZBVr82O','2025-04-27 08:54:30'),(3,'Poonam Purohit','9391162929','$2b$10$kigjLo2dNfr.y7rulV1QBurCnGqyn/eA.wjW8BSLM2duhdum1lV.y','2025-04-27 09:02:53'),(4,'Poonam','7410852963','$2b$10$O9Z/eOBHrYhBWfncy5ZcTuFEQ0PfxZ6We2rnLlm3iCYZZQIXgjINS','2025-04-28 06:58:25'),(5,'Unicorn','8791234560','$2b$10$8UfmSZFEA2gcN3b4ZUBn.u/LeM0ZNyO75vg7EXUJdE9V9vmx2NbIG','2025-05-02 07:48:37'),(6,'Bharat Purohit','9553492929','$2b$10$qalNoH0Fdweq73FVrJvYgeumfusZ5dTvwzRr7sq1566FlzWn9Y90m','2025-05-02 08:00:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-02 19:46:22
