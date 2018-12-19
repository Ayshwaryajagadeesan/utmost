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

DROP TABLE IF EXISTS crash_injury_swap;
CREATE TABLE crash_injury_swap (
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
  `risk_helmet` DOUBLE,
  `swap_side_risk_coefficient` DOUBLE, 
  `swap_side_i_unrestrained` DOUBLE,
  `swap_side_i_belted` DOUBLE,
  `swap_side_i_child_optimal` DOUBLE,
  `swap_side_i_child_suboptimal` DOUBLE,
  `swap_side_i_helmet` DOUBLE,
  `swap_side_r_unrestrained` DOUBLE,
  `swap_side_r_belted` DOUBLE,
  `swap_side_r_child_optimal` DOUBLE,
  `swap_side_r_child_suboptimal` DOUBLE,
  `swap_side_r_helmet` DOUBLE,
  `swap_rear_risk_coefficient` DOUBLE,
  `swap_rear_i_unrestrained` DOUBLE,
  `swap_rear_i_belted` DOUBLE,
  `swap_rear_i_child_optimal` DOUBLE,
  `swap_rear_i_child_suboptimal` DOUBLE,
  `swap_rear_i_helmet` DOUBLE,
  `swap_rear_r_unrestrained` DOUBLE,
  `swap_rear_r_belted` DOUBLE,
  `swap_rear_r_child_optimal` DOUBLE,
  `swap_rear_r_child_suboptimal` DOUBLE,
  `swap_rear_r_helmet` DOUBLE
) ENGINE=columnstore;
SHOW WARNINGS;


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
