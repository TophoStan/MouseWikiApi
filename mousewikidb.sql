-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2022 at 11:37 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mousewikidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(100) NOT NULL,
  `brand_name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_image_url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `primary_market` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`, `logo_image_url`, `primary_market`) VALUES
(1, 'Kailh', 'https://pbs.twimg.com/profile_images/1287588127083651072/oNnHUQKv_400x400.jpg', 'Switches'),
(2, 'Pixart', 'https://www.codico.com/media/economix/ip/resized/240x_ext_9e5b3b3_PIXART-Logo1.png', 'Sensors'),
(3, 'Finalmouse', 'https://shop.x-raypad.com/wp-content/uploads/2019/12/finalmouse-logo.png', 'Mouse'),
(4, 'Omron', 'https://www.mouser.fr/images/pressroom/hires/LPR_Omron_Logo.PNG', 'Microswitches');

-- --------------------------------------------------------

--
-- Table structure for table `encoder`
--

CREATE TABLE `encoder` (
  `encoder_id` int(100) NOT NULL,
  `brand_id` int(100) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `height` int(100) NOT NULL,
  `image_url` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `encoder`
--

INSERT INTO `encoder` (`encoder_id`, `brand_id`, `name`, `height`, `image_url`) VALUES
(1, 1, 'Kailh Red', 9, 'https://ae01.alicdn.com/kf/HTB1YNCcKFzqK1RjSZFCq6zbxVXac/Kailh-7-8-9-10-11-12-Mm-Rotary-Muis-Scroll-Wheel-Encoder-1-74-Mm.jpg_50x50.jpg_.webp');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` int(100) NOT NULL,
  `itemname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `itemname`, `image_url`) VALUES
(1, 'LOGO_Kailh', 'https://pbs.twimg.com/profile_images/1287588127083651072/oNnHUQKv_400x400.jpg'),
(2, 'MOUSE_FINALMOUSE_STARLIGHT_PHANTOM', 'https://i.rtings.com/assets/products/ZEZjttUG/finalmouse-starlight-12-phantom-small/design-medium.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `mice`
--

CREATE TABLE `mice` (
  `mouse_id` int(100) NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `msrp` decimal(15,2) NOT NULL,
  `shape` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `polling_rate` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `switch` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `button_count` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_color` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sensor` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lens` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cable` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scroll_type` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'If optical or mechanical\n',
  `scroll_encoder` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Brand-variation-height',
  `weight` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mice`
--

INSERT INTO `mice` (`mouse_id`, `name`, `brand`, `description`, `imageUrl`, `msrp`, `shape`, `polling_rate`, `switch`, `button_count`, `main_color`, `sensor`, `lens`, `cable`, `scroll_type`, `scroll_encoder`, `weight`) VALUES
(1, 'Xm1r', 'Endgame gear', 'The XM1r is a refresh of the XM1 Gaming Mouse. Available in an additional two editions, it has an updated PixArt PAW3370 optical sensor and custom-sorted Kailh GM 8.0 switches. It also sports a hybrid skate design and all new firmware and software developed in Germany.', 'https://img.endgamegear.com/products/xm1r/black/GAMO-941-pdp_09.png', '59.99', 'Ambidextrous', '1000', '(B) Kailh GM8.0 ', '6', 'Black', 'Pixart 3370', 'Optical', 'Wired', 'Mechanical', 'Alps', 70),
(2, 'Starlight-12 Phantom', 'Finalmouse', 'The Magnesium chassis and construction for the Starlight Phantom has been improved and refined in a multitude of ways. Structural support, wheel adjustments, base adjustments, click changes, and pcba changes were all made to create an even more polished feeling when holding the Starlight-12 in hand. The weight of the mouse has not been affected and we expect the Starlight-12 phantom to actually come in lighter than its predecessors. ', 'https://image.goxip.com/C2TeY-n9xr3WFMeG3i20G7HphUA=/fit-in/400x400/filters:quality(80):fill(white)/https:%2F%2Fimages.stockx.com%2F%2Fimages%2FFinalmouse-Starlight-12-Phantom-Wired-Mouse-Medium-2.jpg', '189.99', 'Ambidextrous', '1000', '(B) Kailh GM8.0 ', '6', 'Black', 'Finalsensor (PAW 3370)', 'Optical', 'Wireless', 'Mechanical', 'Kailh Red ', 43),
(4, 'G703', 'Logitech', 'G703 comes equipped with the PMW3366 optical sensor with zero smoothing, filtering or acceleration across the entire DPI range (200-12,000DPI), delivering exceptional tracking accuracy and consistent responsiveness at any speed.', 'https://tweakers.net/ext/i/2003139976.jpeg', '70.00', 'Ergonomic', '1000', 'Omron D2FC-F-7N', '6', 'black', 'Hero', 'Optical', 'Wireless', 'Mechanical', '11mm', 95);

-- --------------------------------------------------------

--
-- Table structure for table `mouse`
--

CREATE TABLE `mouse` (
  `mouse_id` int(100) NOT NULL,
  `brand_id` int(100) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `msrp` decimal(6,2) NOT NULL,
  `polling_rate` int(100) NOT NULL,
  `shape` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sensor_id` int(100) DEFAULT NULL,
  `weight` int(100) NOT NULL,
  `encoder_id` int(100) NOT NULL,
  `image_id` int(100) NOT NULL,
  `main_switch_id` int(100) NOT NULL,
  `side_switch_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mouse`
--

INSERT INTO `mouse` (`mouse_id`, `brand_id`, `name`, `msrp`, `polling_rate`, `shape`, `sensor_id`, `weight`, `encoder_id`, `image_id`, `main_switch_id`, `side_switch_id`) VALUES
(0, 3, 'Starlight-12 Phantom', '189.99', 1000, 'Ambidextrous', 3, 43, 1, 2, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `mouse_colors`
--

CREATE TABLE `mouse_colors` (
  `mouse_id` int(100) NOT NULL,
  `color` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `sensor_id` int(100) NOT NULL,
  `brand_id` int(100) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lens` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`sensor_id`, `brand_id`, `name`, `lens`) VALUES
(3, 2, 'PMW 3370', 'Optical');

-- --------------------------------------------------------

--
-- Table structure for table `switch`
--

CREATE TABLE `switch` (
  `switch_id` int(100) NOT NULL,
  `brand_id` int(100) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `switch`
--

INSERT INTO `switch` (`switch_id`, `brand_id`, `name`, `image_url`) VALUES
(1, 1, 'GM8.0', 'https://ae01.alicdn.com/kf/H5d0a988aba5d454e941d71fe2a7360d5i/FREES-SHIPPING-Kailh-gm8-0-Black-Mamba-mouse-microswitch-electric-game-alloy-80million-buttons.jpg_Q90.jpg_.webp'),
(8, 1, 'GM4.0', 'https://ae01.alicdn.com/kf/Hb2854fd9b9064f3a888e3291e905b195i/2pcs-Kailh-Red-GM4-0-60M-life-Gaming-Mouse-Micro-Switch-3-Pin-Red-Dot-Used.jpg'),
(10, 4, 'D2LS-21', 'https://media.digikey.com/Photos/Omron%20Elect%20Photos/MFG_D2LS-21.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Emailaddress` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Emailaddress`, `username`, `password`, `isAdmin`) VALUES
(1, 'testmail', 'Stanley', '$2a$05$sRV/cg0eBIt.opSVpC7g7OYSAI7C4XUEFNilqkhVySXmDWxsUCVXK', NULL);

-- --------------------------------------------------------

--
-- Structure for view `brandview`
--
DROP TABLE IF EXISTS `brandview`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER SQL SECURITY DEFINER VIEW `brandview`  AS SELECT `brands`.`brand_id` AS `brand_id`, `brands`.`brand_name` AS `brand_name`, `brands`.`logo_image_url` AS `logo_image_url`, `brands`.`primary_market` AS `primary_market` FROM `brands` ;

-- --------------------------------------------------------

--
-- Structure for view `encoderjoinqeury`
--
DROP TABLE IF EXISTS `encoderjoinqeury`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER  SQL SECURITY DEFINER VIEW `encoderjoinqeury`  AS SELECT `encoder`.`encoder_id` AS `encoder_id`, `brands`.`brand_id` AS `brand_id`, `brands`.`brand_name` AS `brand_name`, `encoder`.`name` AS `name`, `encoder`.`height` AS `height`, `encoder`.`image_url` AS `image_url` FROM (`encoder` join `brands` on(`brands`.`brand_id` = `encoder`.`brand_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `mousejoinquery`
--
DROP TABLE IF EXISTS `mousejoinquery`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER  SQL SECURITY DEFINER VIEW `mousejoinquery`  AS SELECT `mouse`.`mouse_id` AS `mouse_id`, `mouse`.`name` AS `mouseName`, `mouse`.`msrp` AS `msrp`, `mouse`.`polling_rate` AS `polling_rate`, `mouse`.`shape` AS `shape`, `mouse`.`weight` AS `weight`, `mousebrand`.`brand_name` AS `mouse_brand`, `sensor`.`sensor_id` AS `sensor_id`, `sensorbrand`.`brand_name` AS `sensorBrand`, `sensor`.`name` AS `sensorName`, `sensor`.`lens` AS `lens`, `mouseencoder`.`name` AS `encoderName`, `mouseencoder`.`height` AS `height`, `switchbrand`.`brand_name` AS `switchBrand`, `mouseswitch`.`name` AS `switchName`, `mouseimage`.`itemname` AS `itemname`, `mouseimage`.`image_url` AS `image_url`, `sidemouseswitch`.`name` AS `sideSwitchName`, `sideswitchbrand`.`brand_name` AS `sideSwitchBrand` FROM (((((((((`mouse` join `sensor` on(`sensor`.`sensor_id` = `mouse`.`sensor_id`)) join `brands` `mousebrand` on(`mousebrand`.`brand_id` = `mouse`.`brand_id`)) join `brands` `sensorbrand` on(`sensorbrand`.`brand_id` = `sensor`.`brand_id`)) join `images` `mouseimage` on(`mouseimage`.`image_id` = `mouse`.`image_id`)) join `encoder` `mouseencoder` on(`mouseencoder`.`encoder_id` = `mouse`.`encoder_id`)) join `switch` `mouseswitch` on(`mouseswitch`.`switch_id` = `mouse`.`main_switch_id`)) join `brands` `switchbrand` on(`mouseswitch`.`brand_id` = `switchbrand`.`brand_id`)) join `switch` `sidemouseswitch` on(`sidemouseswitch`.`switch_id` = `mouse`.`side_switch_id`)) join `brands` `sideswitchbrand` on(`sideswitchbrand`.`brand_id` = `sidemouseswitch`.`brand_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `sensorjoinquery`
--
DROP TABLE IF EXISTS `sensorjoinquery`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER  SQL SECURITY DEFINER VIEW `sensorjoinquery`  AS SELECT `sensor`.`sensor_id` AS `sensor_id`, `sensor`.`name` AS `name`, `brands`.`brand_name` AS `brand_name`, `brands`.`brand_id` AS `brand_id`, `sensor`.`lens` AS `lens` FROM (`sensor` join `brands` on(`brands`.`brand_id` = `sensor`.`brand_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `switchjoinquery`
--
DROP TABLE IF EXISTS `switchjoinquery`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER  SQL SECURITY DEFINER VIEW `switchjoinquery`  AS SELECT `switch`.`switch_id` AS `switch_id`, `brands`.`brand_name` AS `brand_name`, `brands`.`brand_id` AS `brand_id`, `switch`.`name` AS `name`, `switch`.`image_url` AS `image_url` FROM (`switch` join `brands` on(`switch`.`brand_id` = `brands`.`brand_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `UK_Brand_Name` (`brand_name`);

--
-- Indexes for table `encoder`
--
ALTER TABLE `encoder`
  ADD PRIMARY KEY (`encoder_id`),
  ADD UNIQUE KEY `UK_BrandID_Name` (`brand_id`,`name`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `mice`
--
ALTER TABLE `mice`
  ADD PRIMARY KEY (`mouse_id`);

--
-- Indexes for table `mouse`
--
ALTER TABLE `mouse`
  ADD PRIMARY KEY (`mouse_id`),
  ADD UNIQUE KEY `side_switch_id` (`side_switch_id`),
  ADD UNIQUE KEY `main_switch_id` (`main_switch_id`),
  ADD UNIQUE KEY `image_id` (`image_id`),
  ADD UNIQUE KEY `encoder_id` (`encoder_id`),
  ADD UNIQUE KEY `sensor_id` (`sensor_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `mouse_colors`
--
ALTER TABLE `mouse_colors`
  ADD PRIMARY KEY (`mouse_id`,`color`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`sensor_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `switch`
--
ALTER TABLE `switch`
  ADD PRIMARY KEY (`switch_id`),
  ADD UNIQUE KEY `brand_id` (`brand_id`,`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `Emailaddress_UNIQUE` (`Emailaddress`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `encoder`
--
ALTER TABLE `encoder`
  MODIFY `encoder_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mice`
--
ALTER TABLE `mice`
  MODIFY `mouse_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mouse_colors`
--
ALTER TABLE `mouse_colors`
  MODIFY `mouse_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `sensor_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `switch`
--
ALTER TABLE `switch`
  MODIFY `switch_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `encoder`
--
ALTER TABLE `encoder`
  ADD CONSTRAINT `Encoder_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `mouse`
--
ALTER TABLE `mouse`
  ADD CONSTRAINT `Mouse_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Mouse_ibfk_2` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`sensor_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Mouse_ibfk_3` FOREIGN KEY (`encoder_id`) REFERENCES `encoder` (`encoder_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Mouse_ibfk_4` FOREIGN KEY (`main_switch_id`) REFERENCES `switch` (`switch_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Mouse_ibfk_5` FOREIGN KEY (`side_switch_id`) REFERENCES `switch` (`switch_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `mouse_colors`
--
ALTER TABLE `mouse_colors`
  ADD CONSTRAINT `mouse_colors_ibfk_1` FOREIGN KEY (`mouse_id`) REFERENCES `mouse` (`mouse_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `Sensor_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `switch`
--
ALTER TABLE `switch`
  ADD CONSTRAINT `switch_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
