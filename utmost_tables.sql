CREATE DATABASE IF NOT EXISTS utmost_dev;
use utmost_dev;


DROP TABLE IF EXISTS crash_frequency;
CREATE TABLE crash_frequency (
  `crash_type` VARCHAR(20),
  `crash_direction` VARCHAR(20),
  `vehicle_type` VARCHAR(16),
  `age` VARCHAR(10),
  `driver_age` VARCHAR(10),
  `sex` VARCHAR(10),
  `driver_sex` VARCHAR(10),
  `alcohol_involvement` VARCHAR(25),
  `light_condition` VARCHAR(16),
  `ped_alc` VARCHAR(30),
  `frequency` DOUBLE,
  `dv_key` BIGINT,
  `restraint_key` BIGINT,
  `injury_key` BIGINT,
  `headlighting_key` INT
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS crash_injury;
CREATE TABLE crash_injury (
  `crash_type` VARCHAR(20),
  `crash_direction` VARCHAR(20),
  `vehicle_type` VARCHAR(16),
  `age` VARCHAR(10),
  `driver_age` VARCHAR(10),
  `sex` VARCHAR(10),
  `driver_sex` VARCHAR(10),
  `alcohol_involvement` VARCHAR(25),
  `light_condition` VARCHAR(16),
  `ped_alc` VARCHAR(30),
  `frequency` DOUBLE,
  `dv_key` BIGINT,
  `restraint_key` BIGINT,
  `headlighting_key` INT,
  `coefficient` DOUBLE,
  `unrestrained` DOUBLE,
  `belted` DOUBLE,
  `child_optimal` DOUBLE,
  `child_suboptimal` DOUBLE,
  `helmet` DOUBLE,
  `risk_unrestrained` DOUBLE,
  `risk_belted` DOUBLE,
  `risk_child_optimal` DOUBLE,
  `risk_child_suboptimal` DOUBLE,
  `risk_helmet` DOUBLE
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS dv;
CREATE TABLE dv (
  `dv_key`	BIGINT,
  `mean_dv` DOUBLE,
  `sd_dv` DOUBLE
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS logninv;
CREATE TABLE logninv (
  `prob`	DOUBLE,
  `mean_logninv` DOUBLE,
  `sd_logninv` DOUBLE,
  `res` DOUBLE,
  `logninv_key` VARCHAR(16)
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS restraint;
CREATE TABLE restraint (
  `restraint_key` BIGINT,
  `unrestrained` DOUBLE,
  `belted` DOUBLE,
  `child_optimal` DOUBLE,
  `child_suboptimal` DOUBLE,
  `helmet` DOUBLE
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS injury;
CREATE TABLE injury (
  `injury_key` BIGINT,
  `coefficient` DOUBLE,
  `unrestrained` DOUBLE,
  `belted` DOUBLE,
  `child_optimal` DOUBLE,
  `child_suboptimal` DOUBLE,
  `helmet` DOUBLE,
  `risk_unrestrained` DOUBLE,
  `risk_belted` DOUBLE,
  `risk_child_optimal` DOUBLE,
  `risk_child_suboptimal` DOUBLE,
  `risk_helmet` DOUBLE
) ENGINE=infinidb;
SHOW WARNINGS;

DROP TABLE IF EXISTS intervention_master;
CREATE TABLE intervention_master (
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
  `headlighting_key` INT,
  `relevance` double
) ENGINE=infinidb;
SHOW WARNINGS;



