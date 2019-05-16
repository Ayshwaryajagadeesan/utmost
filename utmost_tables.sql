CREATE DATABASE IF NOT EXISTS utmost_dev;
use utmost_dev;


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
  `impactloc` VARCHAR(10),
  `urbanization` VARCHAR(10),
  `frequency` DOUBLE,
  `dv_key` BIGINT,
  `restraint_key` BIGINT,
  `headlighting_key` INT,
  `cta_key` INT,
  `ctcd_key` INT,
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
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS crash_injury_dev;
CREATE TABLE crash_injury_dev (
  `crash_type` varchar(25) DEFAULT NULL,
  `crash_direction` varchar(20) DEFAULT NULL,
  `vehicle_type` varchar(16) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `driver_age` varchar(10) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `driver_sex` varchar(10) DEFAULT NULL,
  `alcohol_involvement` varchar(25) DEFAULT NULL,
  `light_condition` varchar(16) DEFAULT NULL,
  `ped_alc` varchar(30) DEFAULT NULL,
  `impactloc` varchar(10) DEFAULT NULL,
  `urbanization` varchar(10) DEFAULT NULL,
  `veh_age` varchar(6) DEFAULT NULL,
  `frequency` double DEFAULT NULL,
  `dv_key` bigint(20) DEFAULT NULL,
  `restraint_key` bigint(20) DEFAULT NULL,
  `headlighting_key` int(11) DEFAULT NULL,
  `cta_key` int(11) DEFAULT NULL,
  `ctcd_key` int(11) DEFAULT NULL,
  `coefficient` double DEFAULT NULL,
  `unrestrained` double DEFAULT NULL,
  `belted` double DEFAULT NULL,
  `child_optimal` double DEFAULT NULL,
  `child_suboptimal` double DEFAULT NULL,
  `helmet` double DEFAULT NULL,
  `risk_unrestrained` double DEFAULT NULL,
  `risk_belted` double DEFAULT NULL,
  `risk_child_optimal` double DEFAULT NULL,
  `risk_child_suboptimal` double DEFAULT NULL,
  `risk_helmet` double DEFAULT NULL
) ENGINE=Columnstore DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS crash_fatality;
CREATE TABLE crash_fatality (
  `crash_type` VARCHAR(20),
  `crash_direction` VARCHAR(20),
  `veh_type` VARCHAR(16),
  `age` VARCHAR(10),
  `driver_age` VARCHAR(10),
  `sex` VARCHAR(10),
  `driver_sex` VARCHAR(10),
  `alcohol_involvement` VARCHAR(25),
  `light_condition` VARCHAR(16),
  `ped_alc` VARCHAR(30),
  `impactloc` VARCHAR(10),
  `restraint` VARCHAR(16),
  `frequency` DOUBLE,
  `model_year` INT,
  `dv_key` BIGINT,
  `restraint_key` BIGINT,
  `headlighting_key` INT,
  `cta_key` INT,
  `ctcd_key` INT,
  `fatality_dv_key` BIGINT,
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
) ENGINE=columnstore;
SHOW WARNINGS;



DROP TABLE IF EXISTS crash_fatality_dev;
CREATE TABLE `crash_fatality_dev` (
  `crash_type` varchar(25) DEFAULT NULL,
  `crash_direction` varchar(20) DEFAULT NULL,
  `veh_type` varchar(16) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `driver_age` varchar(10) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `driver_sex` varchar(10) DEFAULT NULL,
  `alcohol_involvement` varchar(25) DEFAULT NULL,
  `light_condition` varchar(16) DEFAULT NULL,
  `ped_alc` varchar(30) DEFAULT NULL,
  `impactloc` varchar(10) DEFAULT NULL,
  `restraint` varchar(16) DEFAULT NULL,
  `veh_age` varchar(6) DEFAULT NULL,
  `urbanization_soc` varchar(12) DEFAULT NULL,
  `urbanization_acc` varchar(12) DEFAULT NULL,
  `frequency` double DEFAULT NULL,
  `white` varchar(25) DEFAULT NULL,
  `black` varchar(25) DEFAULT NULL,
  `other` varchar(25) DEFAULT NULL,
  `hispanic` varchar(25) DEFAULT NULL,
  `non_hispanic` varchar(25) DEFAULT NULL,
  `education` varchar(25) DEFAULT NULL,
  `income` varchar(25) DEFAULT NULL,
  `dv_key` bigint(20) DEFAULT NULL,
  `restraint_key` bigint(20) DEFAULT NULL,
  `headlighting_key` int(11) DEFAULT NULL,
  `cta_key` int(11) DEFAULT NULL,
  `ctcd_key` int(11) DEFAULT NULL,
  `fatality_dv_key` bigint(20) DEFAULT NULL,
  `coefficient` double DEFAULT NULL,
  `unrestrained` double DEFAULT NULL,
  `belted` double DEFAULT NULL,
  `child_optimal` double DEFAULT NULL,
  `child_suboptimal` double DEFAULT NULL,
  `helmet` double DEFAULT NULL,
  `risk_unrestrained` double DEFAULT NULL,
  `risk_belted` double DEFAULT NULL,
  `risk_child_optimal` double DEFAULT NULL,
  `risk_child_suboptimal` double DEFAULT NULL,
  `risk_helmet` double DEFAULT NULL
) ENGINE=Columnstore DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS dv;
CREATE TABLE dv (
  `dv_key`	BIGINT,
  `mean_dv` DOUBLE,
  `sd_dv` DOUBLE
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS fatality_dv;
CREATE TABLE fatality_dv (
  `fatality_dv_key`	BIGINT,
  `mean_dv` DOUBLE,
  `sd_dv` DOUBLE
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS logninv;
CREATE TABLE logninv (
  `prob`	DOUBLE,
  `mean_logninv` DOUBLE,
  `sd_logninv` DOUBLE,
  `res` DOUBLE,
  `logninv_key` VARCHAR(16)
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS restraint;
CREATE TABLE restraint (
  `restraint_key` BIGINT,
  `unrestrained` DOUBLE,
  `belted` DOUBLE,
  `child_optimal` DOUBLE,
  `child_suboptimal` DOUBLE,
  `helmet` DOUBLE
) ENGINE=columnstore;
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
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS intervention_master;
CREATE TABLE intervention_master (
  `intervention` VARCHAR(25),
  `target_column` VARCHAR(25)
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS ldw;
CREATE TABLE ldw (
  `dv_key` BIGINT,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS ldw_rollover;
CREATE TABLE ldw_rollover (
  `dv_key` BIGINT,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS ldp;
CREATE TABLE ldp (
  `ctcd_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS ldp_rollover;
CREATE TABLE ldp_rollover (
  `ctcd_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;


DROP TABLE IF EXISTS lka;
CREATE TABLE lka (
  `ctcd_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS lka_rollover;
CREATE TABLE lka_rollover (
  `ctcd_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS bsw;
CREATE TABLE bsw (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS rdw;
CREATE TABLE rdw (
  `dv_key` BIGINT,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS csw;
CREATE TABLE csw (
  `dv_key` BIGINT,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;


DROP TABLE IF EXISTS acc;
CREATE TABLE acc (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS alcohol_interlock;
CREATE TABLE alcohol_interlock (
  `alcohol_involvement` VARCHAR(20),
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS fcw;
CREATE TABLE fcw (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS fcw_lv_decel;
CREATE TABLE fcw_lv_decel (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS fcw_lv_slower;
CREATE TABLE fcw_lv_slower (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS fcw_lv_stopped;
CREATE TABLE fcw_lv_stopped (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS aeb;
CREATE TABLE aeb (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS aeb_lv_decel;
CREATE TABLE aeb_lv_decel (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS aeb_lv_slower;
CREATE TABLE aeb_lv_slower (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS aeb_lv_stopped;
CREATE TABLE aeb_lv_stopped (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS pedestrian_detection;
CREATE TABLE pedestrian_detection (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS backing;
CREATE TABLE backing (
  `cta_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS adaptive_headlighting;
CREATE TABLE adaptive_headlighting (
  `headlighting_key` INT,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS arb;
CREATE TABLE arb (
  `crash_type` VARCHAR(20),
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;

DROP TABLE IF EXISTS esc;
CREATE TABLE esc (
  `ctcd_key` int,
  `relevance` double
) ENGINE=columnstore;
SHOW WARNINGS;
