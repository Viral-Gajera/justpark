-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2024 at 07:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jpark`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `password`) VALUES
('superadmin@gmail.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `rent_details`
--

CREATE TABLE `rent_details` (
  `rentId` int(11) NOT NULL,
  `providerId` int(11) NOT NULL,
  `renterId` int(11) NOT NULL,
  `spotIndex` int(11) NOT NULL,
  `from` datetime NOT NULL,
  `to` datetime NOT NULL,
  `vehicleNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rent_details`
--

INSERT INTO `rent_details` (`rentId`, `providerId`, `renterId`, `spotIndex`, `from`, `to`, `vehicleNo`) VALUES
(5, 27, 3, 0, '2024-01-16 05:00:00', '2024-01-16 07:00:00', 1520),
(6, 27, 3, 1, '2024-01-16 04:00:00', '2024-01-16 08:00:00', 1520),
(7, 27, 3, 2, '2024-01-16 04:00:00', '2024-01-16 07:00:00', 152),
(8, 27, 3, 3, '2024-01-16 04:00:00', '2024-01-16 07:00:00', 150),
(9, 27, 3, 4, '2024-01-16 04:00:00', '2024-01-16 07:00:00', 13),
(10, 27, 3, 0, '2024-01-16 17:00:00', '2024-01-16 19:00:00', 1502),
(11, 27, 3, 1, '2024-01-16 18:00:00', '2024-01-16 20:00:00', 0),
(12, 28, 3, 0, '2024-01-16 18:00:00', '2024-01-16 20:00:00', 0),
(13, 28, 1, 0, '2024-01-27 12:00:00', '2024-01-27 13:00:00', 1234),
(15, 28, 1, 0, '2024-01-28 13:00:00', '2024-01-28 17:00:00', 1317);

-- --------------------------------------------------------

--
-- Table structure for table `space_provider`
--

CREATE TABLE `space_provider` (
  `providerId` int(10) NOT NULL,
  `fullName` varchar(250) NOT NULL,
  `spaceName` varchar(250) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(10) NOT NULL,
  `phoneNo` bigint(11) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `from` varchar(10) DEFAULT NULL,
  `to` varchar(10) DEFAULT NULL,
  `maxSpace` int(5) NOT NULL,
  `ratePerHour` int(50) NOT NULL,
  `fileUrls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` int(5) DEFAULT NULL,
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `space_provider`
--

INSERT INTO `space_provider` (`providerId`, `fullName`, `spaceName`, `email`, `password`, `phoneNo`, `latitude`, `longitude`, `from`, `to`, `maxSpace`, `ratePerHour`, `fileUrls`, `rating`, `status`) VALUES
(27, 'Viral Gajera', 'My parking ', 'viral.gajera218@gmail.com', '123', 9714040515, 22.279671503144602, 70.84015937375146, '15:36', '03:36', 5, 10, '[\"1705313410272.jpg\"]', NULL, 1),
(28, 'Subham Solanki', 'Solanki Parking Area', 'subham.solanki@gmail.com', '123', 9714040515, 22.285278772120392, 70.82433826043496, '21:06', '09:06', 10, 10, '[\"1705333032648.jpg\",\"1705333032684.png\"]', NULL, 1),
(29, 'New Temp', 'dsfa', 'new', '12', 97, 22.28019365662087, 70.80200130692387, '21:21', '21:21', 10, 10, '[\"1705333942157.jpg\",\"1705333942196.png\"]', NULL, 0),
(30, 'New Account', 'New Parking', 'new.account@gmail.com', '123', 9714040515, 23.011994234366057, 72.57172415632408, '22:39', '10:39', 10, 10, '[\"1705338653179.jpg\"]', NULL, 1),
(31, 'Test', 'Test Parking Space', 'test@gmail.com', '123', 9714040515, 22.24475151090321, 70.79947780606152, '01:35', '13:35', 10, 12, '[\"1706342752111.jpg\",\"1706342752219.png\"]', NULL, 0),
(32, 'Test', 'Name', 'test@gmail.com', '123', 9714040515, 40.719372027358084, -73.98374863620403, '01:47', '13:47', 10, 10, '[\"1706343462622.jpg\",\"1706343462686.png\"]', NULL, 0),
(33, 'Test', 'Nane', 'test@gmail.com', '123', 9714040515, 40.712601678534234, -74.00211929577027, '01:51', '13:51', 10, 10, '[\"1706343719691.jpg\",\"1706343720053.png\"]', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `space_renter`
--

CREATE TABLE `space_renter` (
  `renterId` int(10) NOT NULL,
  `userName` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(10) NOT NULL,
  `phoneNo` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `space_renter`
--

INSERT INTO `space_renter` (`renterId`, `userName`, `email`, `password`, `phoneNo`) VALUES
(1, 'Viral Gajera', 'viral.gajera218@gmail.com', '123', 2147483647),
(3, 'Shubham Solanki', 'subham.solanki@gmail.com', '456', 2147483647),
(4, 'Viral Gajera', 'viral.gajera218@gmail.com', '123', 2147483647);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `rent_details`
--
ALTER TABLE `rent_details`
  ADD PRIMARY KEY (`rentId`),
  ADD KEY `provider_id` (`providerId`),
  ADD KEY `renter_id` (`renterId`);

--
-- Indexes for table `space_provider`
--
ALTER TABLE `space_provider`
  ADD PRIMARY KEY (`providerId`);

--
-- Indexes for table `space_renter`
--
ALTER TABLE `space_renter`
  ADD PRIMARY KEY (`renterId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rent_details`
--
ALTER TABLE `rent_details`
  MODIFY `rentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `space_provider`
--
ALTER TABLE `space_provider`
  MODIFY `providerId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `space_renter`
--
ALTER TABLE `space_renter`
  MODIFY `renterId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rent_details`
--
ALTER TABLE `rent_details`
  ADD CONSTRAINT `rent_details_ibfk_1` FOREIGN KEY (`providerId`) REFERENCES `space_provider` (`providerId`),
  ADD CONSTRAINT `rent_details_ibfk_2` FOREIGN KEY (`renterId`) REFERENCES `space_renter` (`renterId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
