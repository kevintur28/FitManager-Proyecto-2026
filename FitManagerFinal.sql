CREATE DATABASE  IF NOT EXISTS `fitmanager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `fitmanager`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fitmanager
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `asistencias`
--

DROP TABLE IF EXISTS `asistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencias` (
  `id_Asistencias` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `id_Usuarios` int(11) NOT NULL,
  PRIMARY KEY (`id_Asistencias`),
  UNIQUE KEY `uk_asistencia_usuario_fecha` (`id_Usuarios`,`fecha`),
  CONSTRAINT `fk_asistencias_usuarios` FOREIGN KEY (`id_Usuarios`) REFERENCES `usuarios` (`id_Usuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencias`
--

LOCK TABLES `asistencias` WRITE;
/*!40000 ALTER TABLE `asistencias` DISABLE KEYS */;
INSERT INTO `asistencias` VALUES (3,'2026-05-13',1),(2,'2026-05-14',1),(1,'2026-05-15',1),(4,'2026-05-15',11);
/*!40000 ALTER TABLE `asistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `id_Clases` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_Clases`),
  UNIQUE KEY `uk_clases_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (4,'Crossfit'),(2,'Funcional'),(5,'Pilates'),(1,'Spinning'),(3,'Yoga'),(6,'Zumba');
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacionesfisicas`
--

DROP TABLE IF EXISTS `evaluacionesfisicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacionesfisicas` (
  `id_EvaluacionesFisicas` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `peso` varchar(10) DEFAULT NULL,
  `edad` varchar(10) DEFAULT NULL,
  `condicion` varchar(50) DEFAULT NULL,
  `pruebas` varchar(100) DEFAULT NULL,
  `id_Usuarios` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_EvaluacionesFisicas`),
  KEY `id_Usuarios` (`id_Usuarios`),
  CONSTRAINT `evaluacionesfisicas_ibfk_1` FOREIGN KEY (`id_Usuarios`) REFERENCES `usuarios` (`id_Usuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacionesfisicas`
--

LOCK TABLES `evaluacionesfisicas` WRITE;
/*!40000 ALTER TABLE `evaluacionesfisicas` DISABLE KEYS */;
INSERT INTO `evaluacionesfisicas` VALUES (1,'2026-04-15','65.0','18','Buena','Carrera de 100 metros',6),(2,'2026-04-13','60.0','18','Media','Test De Cooper',2),(3,'2025-11-20','74.0','28','Excelente','50 dominadas',1),(4,'2026-01-27','59.0','44','Mala','Eliptica 10 minutos',5);
/*!40000 ALTER TABLE `evaluacionesfisicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fact_cabecera`
--

DROP TABLE IF EXISTS `fact_cabecera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fact_cabecera` (
  `id_Fact_Cabecera` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_fact` date NOT NULL,
  `n_factura` varchar(45) NOT NULL,
  `valorTotal` varchar(45) NOT NULL,
  `id_MetodoPago` int(11) NOT NULL,
  `id_Usuarios` int(11) NOT NULL,
  PRIMARY KEY (`id_Fact_Cabecera`),
  KEY `fk_usuarios_Fact_Cabecera` (`id_Usuarios`),
  KEY `fk_metodoPago_Fact_Cabecera` (`id_MetodoPago`),
  CONSTRAINT `fk_metodoPago_Fact_Cabecera` FOREIGN KEY (`id_MetodoPago`) REFERENCES `metodopago` (`id_metodopago`),
  CONSTRAINT `fk_usuarios_Fact_Cabecera` FOREIGN KEY (`id_Usuarios`) REFERENCES `usuarios` (`id_Usuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fact_cabecera`
--

LOCK TABLES `fact_cabecera` WRITE;
/*!40000 ALTER TABLE `fact_cabecera` DISABLE KEYS */;
INSERT INTO `fact_cabecera` VALUES (1,'2026-02-05','1','70000',1,1),(2,'2025-12-30','2','80000',3,5),(3,'2026-04-24','3','140000',1,1),(4,'2026-04-20','4','55000',2,5),(5,'2026-02-27','5','90000',1,2);
/*!40000 ALTER TABLE `fact_cabecera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fact_detallada`
--

DROP TABLE IF EXISTS `fact_detallada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fact_detallada` (
  `id_Fact_Detallada` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` varchar(45) NOT NULL,
  `id_productos` int(11) NOT NULL,
  `id_Fact_Cabecera` int(11) NOT NULL,
  PRIMARY KEY (`id_Fact_Detallada`),
  KEY `fk_productos_Fact_Detallada` (`id_productos`),
  KEY `fk_FactCabecera_FactDetallada` (`id_Fact_Cabecera`),
  CONSTRAINT `fk_FactCabecera_FactDetallada` FOREIGN KEY (`id_Fact_Cabecera`) REFERENCES `fact_cabecera` (`id_Fact_Cabecera`),
  CONSTRAINT `fk_productos_Fact_Detallada` FOREIGN KEY (`id_productos`) REFERENCES `productos` (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fact_detallada`
--

LOCK TABLES `fact_detallada` WRITE;
/*!40000 ALTER TABLE `fact_detallada` DISABLE KEYS */;
INSERT INTO `fact_detallada` VALUES (1,'3',1,1),(2,'1',4,2),(3,'4',4,3),(4,'2',3,4),(5,'3',2,5);
/*!40000 ALTER TABLE `fact_detallada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membresias`
--

DROP TABLE IF EXISTS `membresias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membresias` (
  `id_Membresias` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  `precio` double NOT NULL,
  `duracion_dias` int(11) NOT NULL,
  PRIMARY KEY (`id_Membresias`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membresias`
--

LOCK TABLES `membresias` WRITE;
/*!40000 ALTER TABLE `membresias` DISABLE KEYS */;
INSERT INTO `membresias` VALUES (1,'Diaria',5000,1),(2,'Mensual',50000,30),(3,'Bimestral',90000,60),(4,'Trimestral',130000,90),(5,'Semestral',245000,180),(6,'Anual',450000,365);
/*!40000 ALTER TABLE `membresias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metas`
--

DROP TABLE IF EXISTS `metas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metas` (
  `id_Metas` int(11) NOT NULL AUTO_INCREMENT,
  `ejercicio` varchar(100) NOT NULL,
  `meta` int(11) NOT NULL,
  `id_Usuarios` int(11) NOT NULL,
  PRIMARY KEY (`id_Metas`),
  KEY `fk_metas_usuarios` (`id_Usuarios`),
  CONSTRAINT `fk_metas_usuarios` FOREIGN KEY (`id_Usuarios`) REFERENCES `usuarios` (`id_Usuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metas`
--

LOCK TABLES `metas` WRITE;
/*!40000 ALTER TABLE `metas` DISABLE KEYS */;
INSERT INTO `metas` VALUES (1,'Press banca',50,1),(2,'Sentadilla',80,5),(3,'Press Banca',25,5);
/*!40000 ALTER TABLE `metas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodopago`
--

DROP TABLE IF EXISTS `metodopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodopago` (
  `id_metodopago` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_metodopago`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodopago`
--

LOCK TABLES `metodopago` WRITE;
/*!40000 ALTER TABLE `metodopago` DISABLE KEYS */;
INSERT INTO `metodopago` VALUES (1,'Efectivo'),(2,'Tarjeta'),(3,'Transferencia');
/*!40000 ALTER TABLE `metodopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_productos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Creatina',120000.00),(2,'Proteina',90000.00),(3,'Pre-entreno',50000.00),(4,'Botilo De Agua',25000.00),(5,'Botella De Agua',5000.00);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id_Proveedores` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `tipo_producto` varchar(45) NOT NULL,
  PRIMARY KEY (`id_Proveedores`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Pablo Recojedor','Proteina'),(2,'Pedro Carrascal','Creatina'),(3,'Pepe Garcia','Pre-entreno'),(4,'Patricio Fugaz','Botilo De Agua'),(5,'Kristian Rangel','Botella De Agua');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros` (
  `id_Registros` int(11) NOT NULL AUTO_INCREMENT,
  `ejercicio` varchar(100) NOT NULL,
  `repeticiones` int(11) NOT NULL,
  `peso` decimal(10,2) NOT NULL,
  `fecha` date NOT NULL,
  `id_Usuarios` int(11) NOT NULL,
  PRIMARY KEY (`id_Registros`),
  KEY `fk_registros_usuarios` (`id_Usuarios`),
  CONSTRAINT `fk_registros_usuarios` FOREIGN KEY (`id_Usuarios`) REFERENCES `usuarios` (`id_Usuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros`
--

LOCK TABLES `registros` WRITE;
/*!40000 ALTER TABLE `registros` DISABLE KEYS */;
INSERT INTO `registros` VALUES (1,'Press banca',20,40.00,'2026-05-15',1),(2,'Sentadilla',30,50.00,'2026-05-15',5);
/*!40000 ALTER TABLE `registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_Roles` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_Roles`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Cliente');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutinas`
--

DROP TABLE IF EXISTS `rutinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutinas` (
  `id_Rutinas` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_Usuarios` int(11) NOT NULL,
  PRIMARY KEY (`id_Rutinas`),
  KEY `fk_rutinas_usuarios` (`id_Usuarios`),
  CONSTRAINT `fk_rutinas_usuarios` FOREIGN KEY (`id_Usuarios`) REFERENCES `usuarios` (`id_Usuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutinas`
--

LOCK TABLES `rutinas` WRITE;
/*!40000 ALTER TABLE `rutinas` DISABLE KEYS */;
INSERT INTO `rutinas` VALUES (1,'Rutina pecho','Press banca, flexiones y aperturas',1),(2,'Rutina pierna','Sentadilla, prensa y zancadas',5);
/*!40000 ALTER TABLE `rutinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes` (
  `id_Sedes` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Direccion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_Sedes`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

LOCK TABLES `sedes` WRITE;
/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
INSERT INTO `sedes` VALUES (1,'Taurus GYM','Cra. 45a #74-38 Sur'),(2,'Generico GYM','cll 80c sur #68b-39'),(3,'Bodytech GYM','Cl. 12 Sur #31 - 33'),(4,'SmartFit GYM','Cl. 34 Sur #A Sur 34D - 50');
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `id_TipoDocumento` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_TipoDocumento`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'Tarjeta De Identidad (T.I)'),(2,'Cedula De Ciudadania (C.C)'),(3,'Cedula De Extranjeria (C.E)'),(4,'Permiso Especial de Permanencia (P.E.P)'),(5,'Pasaporte (P.A)');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_Usuarios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_TipoDocumento` int(11) DEFAULT NULL,
  `id_Roles` int(11) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `id_Membresias` int(11) DEFAULT NULL,
  `vencimiento` date DEFAULT NULL,
  PRIMARY KEY (`id_Usuarios`),
  KEY `id_TipoDocumento` (`id_TipoDocumento`),
  KEY `id_Roles` (`id_Roles`),
  KEY `id_Membresias` (`id_Membresias`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_TipoDocumento`) REFERENCES `tipo_documento` (`id_TipoDocumento`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_Roles`) REFERENCES `roles` (`id_Roles`),
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`id_Membresias`) REFERENCES `membresias` (`id_Membresias`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Alan','Cruz','1012508006','AlanCru@gmail.com',2,2,'123456',1,'2026-06-15'),(2,'Dylan','Vera','1013609004','dverapenuela@gmail.com',2,1,'200607Kd$',6,NULL),(5,'Maria','Pilar','53099689','Mariapilar@gmail.com',2,2,'987654',4,'2026-07-01'),(6,'Kevin','Turizo','1028885474','ke2812007@gmail.com',2,1,'Kevin28122007#',6,NULL),(11,'Pedro','Narvaez','1039687994','pedronar@gmail.com',2,2,'246810@',3,'2026-08-20');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_clases`
--

DROP TABLE IF EXISTS `usuarios_clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_clases` (
  `id_Usuarios` int(11) NOT NULL,
  `id_Clases` int(11) NOT NULL,
  `fecha_inscripcion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_Usuarios`,`id_Clases`),
  KEY `fk_usuarios_clases_clase` (`id_Clases`),
  CONSTRAINT `fk_usuarios_clases_clase` FOREIGN KEY (`id_Clases`) REFERENCES `clases` (`id_Clases`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_clases_usuario` FOREIGN KEY (`id_Usuarios`) REFERENCES `usuarios` (`id_Usuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_clases`
--

LOCK TABLES `usuarios_clases` WRITE;
/*!40000 ALTER TABLE `usuarios_clases` DISABLE KEYS */;
INSERT INTO `usuarios_clases` VALUES (1,1,'2026-05-15 16:01:22'),(1,2,'2026-05-15 16:01:22'),(5,3,'2026-05-15 16:01:22');
/*!40000 ALTER TABLE `usuarios_clases` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-15 11:16:28
