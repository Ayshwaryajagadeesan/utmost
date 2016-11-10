CREATE DATABASE IF NOT EXISTS utmost_dev;
use utmost_dev;


DROP TABLE IF EXISTS crash_frequency;
CREATE TABLE crash_frequency (
  `crash_type` VARCHAR(20),
  `crash_direction` VARCHAR(20),
  `age` VARCHAR(10),
  `sex` VARCHAR(10),
  `alcohol_involvement` VARCHAR(25),
  `vehicle_type` VARCHAR(10),
  `light_condition` INT,
  `ped_alc` INT,
  `frequency` DOUBLE,
  `injury_frequency` DOUBLE,
  `injury_coeff` DOUBLE,
  `injury_intercept` DOUBLE,
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS dv;
CREATE TABLE dv (
  `crash_type` VARCHAR(20),
  `crash_direction` VARCHAR(20),
  `alcohol_involvement` VARCHAR(25),
  `mean_dv` DOUBLE,
  `sd_dv` DOUBLE
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS restraint;
CREATE TABLE restraint (
  `age` VARCHAR(10),
  `alcohol_involvement` VARCHAR(25),
  `vehicle_type` VARCHAR(10),
  `unrestrained` DOUBLE,
  `belted` DOUBLE,
  `child_seat_optimal` DOUBLE,
  `child_seat_suboptimal` DOUBLE,
  `helmet_worn` DOUBLE,
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS intervention_master;
CREATE TABLE restraint (
  `intervention` VARCHAR(25),
  `target_column` VARCHAR(25)
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS ldw;
CREATE TABLE ldw (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS acc;
CREATE TABLE acc (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS alcohol_interlock;
CREATE TABLE alcohol_interlock (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS fcw;
CREATE TABLE fcw (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS pedestrian_detection;
CREATE TABLE pedestrian_detection (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS backing;
CREATE TABLE backing (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS adaptive_headlighting;
CREATE TABLE adaptive_headlighting (
  `crash_type` VARCHAR(20),
  `light_condition` INT,
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;



