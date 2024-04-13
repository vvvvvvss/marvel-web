CREATE TABLE `articles` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOfArticle` enum('BLOG','RESOURCE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coverPhoto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewStatus` enum('PENDING','APPROVED','FLAGGED','FEATURED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `feedback` tinytext COLLATE utf8mb4_unicode_ci,
  `rankingScore` int NOT NULL DEFAULT '1',
  `caption` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `articles_title_typeOfArticle_reviewStatus_caption_idx` (`title`,`typeOfArticle`,`reviewStatus`,`caption`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ArticleToCourse` (
  `articleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`articleId`,`courseId`),
  KEY `ArticleToCourse_articleId_idx` (`articleId`),
  KEY `ArticleToCourse_courseId_idx` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ArticleToPeople` (
  `role` enum('OP','PENDING','GUEST') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OP',
  `articleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`articleId`,`personId`),
  KEY `ArticleToPeople_articleId_idx` (`articleId`),
  KEY `ArticleToPeople_personId_idx` (`personId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Course` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseDuration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalLevels` int NOT NULL,
  `rankingScore` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `coverPhoto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repoURL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Course_courseCode_key` (`courseCode`),
  KEY `Course_courseCode_caption_idx` (`courseCode`,`caption`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Event` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOfEvent` enum('EVENT','WORKSHOP','COMPETITION','TALK') COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coverPhoto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `registrationStartTime` datetime(3) DEFAULT NULL,
  `registrationEndTime` datetime(3) DEFAULT NULL,
  `eventStartTime` datetime(3) NOT NULL,
  `eventEndTime` datetime(3) DEFAULT NULL,
  `actionLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actionText` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Event_title_caption_idx` (`title`,`caption`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `People` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `googleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePic` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `readMe` text COLLATE utf8mb4_unicode_ci,
  `rankingScore` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `People_googleId_key` (`googleId`),
  UNIQUE KEY `People_slug_key` (`slug`),
  UNIQUE KEY `People_email_key` (`email`),
  KEY `People_googleId_slug_email_name_idx` (`googleId`,`slug`,`email`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `PeopleOnWork` (
  `workId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('AUTHOR','COORDINATOR') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `personId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`personId`,`workId`),
  KEY `PeopleOnWork_workId_idx` (`workId`),
  KEY `PeopleOnWork_personId_idx` (`personId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Report` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewStatus` enum('PENDING','APPROVED','FLAGGED','FEATURED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `feedback` tinytext COLLATE utf8mb4_unicode_ci,
  `isOverview` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Report_workId_title_reviewStatus_idx` (`workId`,`title`,`reviewStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Scope` (
  `personId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scope` enum('PROFILE','CRDN','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`personId`,`scope`),
  KEY `Scope_personId_idx` (`personId`),
  KEY `Scope_scope_idx` (`scope`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Work` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOfWork` enum('COURSE','PROJECT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coverPhoto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalLevels` int DEFAULT NULL,
  `courseCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` tinytext COLLATE utf8mb4_unicode_ci,
  `searchTerms` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rankingScore` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `Work_courseCode_name_searchTerms_idx` (`courseCode`,`name`,`searchTerms`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
