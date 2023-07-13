-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Jul 2023 pada 03.21
-- Versi server: 10.4.19-MariaDB
-- Versi PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ngedate`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `area`
--

CREATE TABLE `area` (
  `id` int(2) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `area`
--

INSERT INTO `area` (`id`, `name`) VALUES
(1, 'Tebet'),
(2, 'SCBD'),
(3, 'Setiabudi'),
(4, 'Cilandak'),
(5, 'Kebayoran Baru'),
(6, 'Kemang'),
(7, 'Blok M'),
(8, 'Monas'),
(9, 'Menteng'),
(10, 'Salemba'),
(11, 'Bendungan Hilir'),
(12, 'Gambir'),
(13, 'Senen'),
(14, 'Tanah Abang');

-- --------------------------------------------------------

--
-- Struktur dari tabel `authentications`
--

CREATE TABLE `authentications` (
  `token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `authentications`
--

INSERT INTO `authentications` (`token`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTE5NzA4NH0._oLQ4168XcuvdE_KfWdCtjAHiZvC83k_dKrVPyhYEJI'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTE5NzA5OH0.uvIdLldDgbJUnbG3dnMOxz4VrBQU2Gm7cphMnOmQnLc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTIyODY4Mn0.iqOu5K1-tJ1Sg9ozXGUpgfqhEhNBabQ9bUBeh_4fuVU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTIzMDUxNH0.4CtRnzLUynix9a64NkbGZ1HnRQhZj3tdCxHuyU2qyF8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTI2OTA5NX0._HObPcRZG0btp_qYmMa5s0MjNXUUeW_-ACnRChppoNw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTI3Nzg0N30.7c0ncY_rWrQKoq7-yIJfGuPd1mufGWf13O6GsxUP59c'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTI3OTI2MX0.qkT_JvRZHwFmuwokRdbLVxSRljnLNCQ6oDfVsko6tas'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTMxMzgxNn0.L6BTPThTWwalmYIfKanAprUf9kv7TmyxVqMJDTmtoHA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTMyMzk4OH0.W4EzvVkLhpzCQ_2nM3ecVbWhqIzFA-xGjwEzKseHIew'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTMyNTk2OX0.6ixs9jKlfdl_Tgg164e1SjhA4GqzZWYfWf1WisRoQeI'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTMyODM3NH0.ssUGEKbn0Ddf9g-GnTiU--8fnIWoqG8D3fFIgJmasSA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTMzNTQ1M30.11lc9zBYNO0O2Fh2z22aiogAip8oErrjM2wA0fWAwg8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTMzNzkwM30.ILnSdrApViHGgYsGZU4niNb0WsW821g_ZlvwGFlt4uQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM2MTg4N30.JzmSi7u-QMr4qOUA9czNBSH6DAeJJjNuDDo7X9V6gK4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM2MzczNX0.l-JIRDUi6tgVm_VgtTJ8dOdMYomw1fXT7zV91RmuxAw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM2NTU5OH0.qrvMHCGRKqNEc5sNV4u5WuxZbXc_neu5G_iiKAEMFfo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM2NjcyNn0.br3GAG_3pHxqr85vRXeTyESG1SKxzcyddI0mOBVPGvI'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM2Njg4NH0.BJpRWqpmVwSt5UPwDMp9FZMWt7pEFQfcl08R_QnDl4w'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM2Njk2NH0.4eMPruOddW5FMucFDngWrvSO-2D44bUPMCmWJiErIak'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM2NzAwMn0.hGySlRrtvjJUp3YFP_ymSMZI7c2U_pKamz67MiaJMdY'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM2NzA2N30.HMIDxBoBDwy8HB1eE31bAjrwhqjmLGBVoTP8zddNeM0'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM2NzE1MH0.CYNGRtVeZs3HtLlIL9YVoRXYTmSL3aEgcDnFq1kegGA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM2NzE4Mn0._43wyKQHEC8TNzytpTzsylGpc9Je34V4N30qjZKfyXg'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM2NzE5OH0.e2F0_qaJA6r7D1MzDWW-ersH1CFjYUKOCC4DUwRczFw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM2NzIwMn0.vJ5WH7_3u2h3yNbe1xEd9_oJJnyxgqWEqiWDB6z-Gpo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM2NzIwN30.Kn2tZNVquqe4H2hAs_-vNm0uRf5maSCZwPf7ys8OH7o'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM2NzgyNX0.ksHs0u4U8FQaF0V5UZMYusStZbpIRc5Prk5M-hpRjPA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3MzM1MX0.7RfX3aV7bmAJg3Tsr-KMPe3nfV9DbIYSi-yx0luJT4w'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3MzQ1Nn0.WlG0bckte2U141sCMrbnA9mKP8OEkXMx1WpA1WlBMz4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3MzQ2Mn0.5OZNjTTwzHHt12qJaZTFGxoB073ovOMEE5WuDQQxMlo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3MzUzMH0.WpcExXzBRd-JMiJkXFdotNoZSCs32s0v5P46NzaZFXc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3MzU1MH0.r1jDRLS0npm21Q_-l0Ur5js1_Jd-Ul5RL1tsNzY7wZc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3MzU2MH0.Dv7SuuGPVMdNy2n7YAZRRQ0kcQMLqUucZenoqxncgcQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM3MzU3Nn0.8UDY23U4XZhP43ZVHnB_HbV7yY9adm20esi_P5ZgGlQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTM3NDUzOX0.vV-zu4E5XEPk1aeeH0xThqvAlnTFxpkSyYlDpXAJeYQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3NDU4OH0.cVqfDe1yG08QFUuxwZlBSrTLFvIjhmRmKQ-T6uHs5AA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM3NDkwMX0.nmR3OlYeSa0HmwSqoae5mIvNoMF7lL2x9i5uFDfC4bk'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM5ODU1OX0.PBSIGu0WD-y4CHbji69uKcfS7SN1GBCYKDO43b8rxHU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM5ODU2OX0.b9ihlH414yIot7bbmnfkGte3cw5xNwm3q5bBLg25lkY'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTM5OTEwNX0.kWl57Pla8aD8JNQ7n2xQh2Vi0fAnv5rMuHeAeSgdBE8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQwMjM4Nn0.DLUkRGUz5gDRZ17p3uVGc8UoABeNWjWWKZfKKYeJuVo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTY4NTQwMjgwM30.bam8em9L4gtl8GElSNbaQggWTKO1h1CRjdV80AnNkfs'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQwMjgzMH0.We1_m0ZRGcsoy7NraP0RZQdS8PRNmeZh0D6DxaqDmBQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQwMzI4N30.ow3voGlMZzI7iyx_LsijP_i1-Ui-oDfkg2_62tq6k2I'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQwNTE1Nn0.kK5-ACGtPpBNZ5xTcKbfIT8NuDjjpr_ndohTPV8657k'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQwNTE4OH0.kPK-PgHgP_yfQTGE2VFICD-4OvVkZ8qxWx1h80NrFOc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQwNTk4Nn0.IBt8k0n3FZMEYeCQvir0LDaMREfEVMqE28sUpJ6ENyw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQwNjEyMn0.tcLAyESRmutSssoLErTpWaeH0Ik8P0gPI9Uk7fJxlbo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQwNjEzMn0.M3GsFHJYr8I5SSQQdWToMjgUKHSNXv3T3dQ-KgwPtw4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQwODQ1OX0.b2vieoi3_tfWV-YSiK6dMRQZZE9DbUf2O8U-6Tg8WTI'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQwODQ2NX0.dD2awEbnsYzpJM_wKH9vPdg4HtTbdAGvsEPm1WMi6GQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY4NTQwOTUyNH0.uzYx5wQkNIGSBwEfkAf72yxaa3IIVuJtk3cjJqlWFys'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQxMjI4NH0.1RL13z4_th53IQ7mEJDfec9Y-C0otOFu6sGjinamu4k'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQxMzQwOH0.vZzs9F-fZy-SS_-YFzle4FDgyhjSM2Fz3qL5XZWGd3c'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY4NTQxNDEzNn0.QYjwA69oZ4-rOQzfsw9Jihl9bG12HLBrhnhBl8eKXm4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY4NTQxNDE3M30.qrZC7xn-cKcAMTaPzYxZHHvHhIzcVbD2XXQRECJmvfc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY4NTQxNDI5MH0.f7ubpiB1nBzGpLEYqluv94ZF4Ookvtv4ubNqOSPMVMM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY4NTQxNDQyNH0.LQNL1VyQ9hHn-Lii_SBV54V7I786bWALCoV1d-Nm4bs'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQxNDQ0Nn0.Ie190FFSd9cy5PmR9xK1s_qtRvW9S5093fId9IdsesA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY4NTQxNDQ5OH0.V2bnqahtMPbsAIrstoA48X8Ar8UuxgPzMouNz6zqutY'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQxNDUxMn0.EnmXToBG6ktI6aLRDO1BxLn97Vf32f-9Tdd-IvQbezc'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQxNDY0MH0.wPpqvU-inl7VUHXYG62RcnxOn91jk9cAoQa0l8mSYAU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQxNjg2NX0.rzzO1jk7M9ob5NQ3hzs9sknU2jvKUaXNXHHswImscus'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQzMjE2OX0.mSnbmy_RP_pRUWJ7WJQ0xSbAFNydcQAQO_SVdPd4CBs'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQzNDc4Nn0.kBUBLRp9-R_lypJ9pjqcawmSXqii9h43fTx1hIEjd3U'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQzNjY0NH0.HsFFAtgF2QhY9mJC17LF9f97QlPd7JWBi5cSt2qy96I'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQzODMyNn0.mwt36o7DkV-gQlUzaVIeuDIQB7BAHFomz6RXKE2ROco'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTY4NTQ0MDUwM30.VGrkWw5acgWj8pE_prqTVSF1TVmX2VZH74FoC3mkenU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ0MDU4MH0.nRnmvqeF2MQwinOAf6sMEARRQ9qVsmNvn_9rggZbUpo'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ0MjM4OH0.Hrx27EnOFGZfgAjv9R1l6cuh0kXxVRt3Nl8ZaQ1-Ta4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTA5M30.reCVOPW_zH7hJnPIjgT9kDUTspbTBCotgqEs0Bs9jkY'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTEwNH0.ch-UCf8-wx1p2tCNG7SczFNFOXwS5T0Q_SyqVITBcdU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTIxNH0.oH76bXRXTN0ZwxmOzKDcNybpvGr4Uq6iCP-oCeSKMi8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTI4MH0.BNj6BD9X0fHBL8JdVtICYZPrIBewQIDDJTPL-4rCsmM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTI4OX0.3f8sQpoYCSXWQeo-43Xojm82Vwrv6Iff6cwfqxgCirY'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTI5N30.P6cIvuINaQ6Q9Oz0UlieRUZ71oLcRLigU-J1uuYDKtw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTMzNH0.pnssNHVVEitXz1SJEi3xEHvZrCDwFeTVquoHrigQb6c'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTQ5OX0.S4da8U54DGuqihE-ShI4EzrVxBPOngtxxQFpbPf3WS4'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTUxMX0.lT7YAPG8Dt2Zh8T6hF5oTGTDsRL95HamyeOGc8wDias'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ1OTU0MH0.2oYzhDpc8IZ4i3KBfCkFXxGUCKWKrO47lIIXCVO5UfY'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY4NTQ5MjQ4NX0.I8icxhP2o_K5oQDc8kf16064UTJb_89T_tfl7WQQYO0'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTQ5Mjc0Nn0.CerYCLMYUWmMhw5dNAG4BT-ETKahvKAJNkiucMliL0E'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTQ5MzU0M30.e7cgPVI2V_RSjKqL-D7pU78rtC9C_6A2lDZ9sETaEb8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTQ5NDYyNn0.TCLzNdDuQNgvGQ-w8SmnO28lLFJ1tWVCjp5AI7yEZnU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwMjM2MX0.liwPCOjxL0WnV3424Y58wbqqaBD0YkWWlW4aI-_cea0'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwMjU2Mn0.xURhj-0_2IDzdAGm7f_WPq38V88k3UyW77M1Hl1DB0I'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwMjgyOH0.oeRMVwd3qoSPlNzZH6NQIDRYkTe8MPnMex5LRArCRfI'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwMjkwNn0.Dp8u2OERe8XQX9M-ink9jj1CMiPk_67u9dSD4TGwoo8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwMjkyMn0.3VMRKG5upjoxXykO6YhXX4lmTLXFHlga4UrVF5aoraA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwNDM5M30.bVvYYVh3MJKGi-r5tOPBEI2zEj6KYSxYWfB-wQuYHr0'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwNDQ0Nn0.ewH0LVuqKDIk6QUD-_h72Q2NrhT7KXv3ybEsDBMapgM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUwNDU1MX0.AGXw1-sSton7Hoqwuu7NQ3m9DHsEm_1GAjxj0l5NiZE'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY4NTUxODM0Mn0.Lvux7zZyuTVsRV6DTr8zOm5aUQua-_rWGsbgAmPTJrQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY4NTUxODg5N30.PNcYITyKvDzC4C0GocR-ZeM-IlDvsoIgb9GtcdlytRM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY4NTUxODkwOH0.mygbKlzjEHKu2wsdsKEBLdoQHNaqtlzP3Tmo1uXdrFA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUxOTQyNH0.aQTbv8JRpmWL-mb9rWk72YyTFXisQrrpndEA2L0mJLg'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUyMTYyMX0.OwHUFtfnxN_LQzHl-TGjeFGEFCeihWjOOli7JdzxS9o'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY4NTUyNDg5M30.5i7-yaN3GS9RxQsKNC2sxRkPtgdhMubo2bXED-J8rNk'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUyOTM4M30.PRPxLFaw4DFHou21k6Q44pn9nfIpYEF2YW8mnJ9goQU'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUzNTM5NH0.FmKs7I-V2fa8MbEDSXQgRhItD6doum2E5aQsARVYSzQ'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUzNTQ0Mn0.ZkyTkUY_cpNPEPZlOJQDjghcBS1zebsTbwA4AjUmFDA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTUzNTQ2OX0.y_NAF6nkTUgHTLGpGa04zAOQVD-VDP765tIkeQfdQiY'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTYwMzg1MH0.71Q0ybuK59NZ2LSQ3570ertDMcIeTrdqbuGx4PjJMBw'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTYwNzc5NX0.-rU1Q4jWLAiEDI6OLnb6N4wsN1EMgHqoxWtmNgDTOZs'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NTYwODgxNn0.01OzAFQjwTIK7NhZekPD7I2OOyH3XQUxulKj-9ZXjRA'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NjA2NDM4MH0.UtmrKRZGtXJvF6nvdIG_hmQxGNAXqEfszJ0WOo2f8T8'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NjA2NDM4NH0.KTAE7IpmepGd0fXltqIDrZrR_OPM9UofsTcubqbLawM'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NjA2NDY2Mn0.ZQaUgZrY6QYd8wNlLdo5Eo16626AEfLFIcaTGiA0U34'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NjExMjQ2NH0.7tc6WITYwtIQSWjbACjB6RLhNF2vy47iWYLr54XqPas'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTY4NjExOTE4N30.RfEk9RsN2W0giS7t5g-60b5kBRkPTuA0jSvA-mWt2RY');

-- --------------------------------------------------------

--
-- Struktur dari tabel `facility`
--

CREATE TABLE `facility` (
  `id` int(2) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `facility`
--

INSERT INTO `facility` (`id`, `name`) VALUES
(1, 'Wi-Fi'),
(2, 'Stop Kontak'),
(3, 'Photoboth'),
(4, 'Live Music');

-- --------------------------------------------------------

--
-- Struktur dari tabel `label_spot`
--

CREATE TABLE `label_spot` (
  `id` int(2) NOT NULL,
  `name` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `label_spot`
--

INSERT INTO `label_spot` (`id`, `name`) VALUES
(0, ''),
(1, 'Hidden Gems'),
(2, 'Trendsetter');

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_facility`
--

CREATE TABLE `list_facility` (
  `id_spot` int(2) NOT NULL,
  `id_facility` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `list_facility`
--

INSERT INTO `list_facility` (`id_spot`, `id_facility`) VALUES
(32, 1),
(32, 2),
(32, 3),
(35, 2),
(35, 1),
(35, 4),
(36, 2),
(36, 1),
(37, 2),
(37, 1),
(41, 3),
(41, 4),
(42, 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_spot`
--

CREATE TABLE `list_spot` (
  `id_user` int(2) NOT NULL,
  `id_spot` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `list_spot`
--

INSERT INTO `list_spot` (`id_user`, `id_spot`) VALUES
(50, 32),
(50, 35),
(50, 36),
(50, 37),
(50, 41),
(50, 42);

-- --------------------------------------------------------

--
-- Struktur dari tabel `locations`
--

CREATE TABLE `locations` (
  `id` int(2) NOT NULL,
  `id_region` int(2) NOT NULL,
  `id_area` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `locations`
--

INSERT INTO `locations` (`id`, `id_region`, `id_area`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 2, 12),
(13, 2, 13),
(14, 2, 14);

-- --------------------------------------------------------

--
-- Struktur dari tabel `region`
--

CREATE TABLE `region` (
  `id` int(2) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `region`
--

INSERT INTO `region` (`id`, `name`) VALUES
(1, 'Jakarta Selatan'),
(2, 'Jakarta Pusat');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reviews`
--

CREATE TABLE `reviews` (
  `id` int(2) NOT NULL,
  `id_user` int(2) NOT NULL,
  `id_spot` int(2) NOT NULL,
  `image` varchar(500) NOT NULL,
  `rating` int(1) NOT NULL,
  `review` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `reviews`
--

INSERT INTO `reviews` (`id`, `id_user`, `id_spot`, `image`, `rating`, `review`) VALUES
(135, 51, 32, 'images/1685526282816.jpg', 4, 'Communal space baru di daerah Gandaria. Lokasi persis depan Seirock-Ya. Parkiran luas, tapi karena disini emang rame, jadi parkiran selalu penuh. Helm bisa nitip di pos security nya. Pilihan makanannya banyak, minumannya yang dikit. Ada area outdoor, indoor, dan indoor smoking. Lantai 1 penuh ama makanan, minuman dan pameran, tempat duduk dibawah banyak tapi cocok untuk yang berdua atau sendiri. Lantai 2 ada indoor smoking nya. Cocok buat yang ramean. Toilet cewek di lantai 1 dan cowok di lantai'),
(136, 50, 41, 'images/1686064396302.jpg', 4, 'Nice outdoor hangout place in the middle of office district... Relaxing and its great view.. You should come around 4pm and hang around till sunset... I guarantee you....the view is amazing...I LoVE Jakarta');

-- --------------------------------------------------------

--
-- Struktur dari tabel `spot`
--

CREATE TABLE `spot` (
  `id` int(2) NOT NULL,
  `id_location` int(2) NOT NULL,
  `id_label` int(2) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `image` varchar(200) NOT NULL,
  `desc` varchar(500) NOT NULL,
  `price` int(2) NOT NULL,
  `rating` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `spot`
--

INSERT INTO `spot` (`id`, `id_location`, `id_label`, `name`, `slug`, `image`, `desc`, `price`, `rating`) VALUES
(32, 5, 2, 'Dekhad Gandaria', 'dekhad-gandaria', 'images/1685512987390.jpg', 'As a hub for people and communities, gathering an array of lifestyle brands and noticeable presence through its dynamic communal spot that anchors on an interactive concept.', 45000, 4),
(35, 4, 1, 'EUPHORIA COFFEE', 'euphoria-coffee', 'images/1685513458362.jpg', 'The best ideas start with coffee and end with dessert ✨☕️', 35000, 0),
(36, 3, 2, 'PERON SkyCafe', 'peron-skycafe', 'images/1685513928887.jpg', 'We can see YELLO light in your eyes', 45000, 0),
(37, 4, 1, 'Sore Izakaya', 'sore-izakaya', 'images/1685514379064.jpg', 'An unforgettable rooftop dining experience awaits🚆\n\nA haven for Japanese food lovers and skyline enthusiasts. Indulge in authentic flavors while enjoying the spectacle of MRT Jakarta passing by 🚅', 55000, 0),
(41, 3, 0, 'Chillax Sudirman', 'chillax-sudirman', 'images/1685514792536.jpg', 'Let us take you stroll around Chillax! From relaxation, entertainment, to culinary delights await around every corner of Chillax. When vibrant city life meets serene green spaces, it’s the perfect way to recharge and relax in the heart of Jakarta.', 35000, 4),
(42, 14, 2, 'Taman Kota GBK', 'taman-kota-gbk', 'images/1685516211531.jpg', 'Kawasan Hutan Kota Gelora Bung Karno (GBK) di Jakarta Pusat, kerap menjadi salah satu pilihan favorit untuk piknik gratis bersama orang terkasih.', 10000, 0),
(43, 14, 0, 'One Satrio', 'one-satrio', 'images/1685514379064.jpg', 'Running', 32000, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(2) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `image` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `image`, `password`, `status`, `is_deleted`) VALUES
(50, 'Faishal Zufari', 'isalzufari@gmail.com', 'images/1685535465518.jpg', '$2b$10$AKSDHa2jEXTWYU07Pu6l2O0ykxvXmEsdgu3SnWf2UuWvTjL53lWkq', 1, 0),
(51, 'Indah Kusuma', 'indahkus@gmail.com', 'images/1685519141937.jpg', '$2b$10$fNO/KbL/N.p9ITsAaAvupejAZdbKMocKhR7SihTBeD/q4Glo4.ftu', 0, 0),
(54, 'Faishal - Ubah', 'isalzufari-test@gmail.com', 'images/1686534547665.jpg', '$2b$10$vzyios07UNLk1WvDU9/kV.6t.2hcIw27WiMnQBiqmPQbq0hHL1.xe', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `label_spot`
--
ALTER TABLE `label_spot`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `list_facility`
--
ALTER TABLE `list_facility`
  ADD KEY `id_spot` (`id_spot`),
  ADD KEY `id_facility` (`id_facility`);

--
-- Indeks untuk tabel `list_spot`
--
ALTER TABLE `list_spot`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_spot` (`id_spot`);

--
-- Indeks untuk tabel `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_region` (`id_region`),
  ADD KEY `id_area` (`id_area`);

--
-- Indeks untuk tabel `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_spot` (`id_spot`);

--
-- Indeks untuk tabel `spot`
--
ALTER TABLE `spot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_location` (`id_location`),
  ADD KEY `id_label` (`id_label`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `area`
--
ALTER TABLE `area`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `facility`
--
ALTER TABLE `facility`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `label_spot`
--
ALTER TABLE `label_spot`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `region`
--
ALTER TABLE `region`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT untuk tabel `spot`
--
ALTER TABLE `spot`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `list_facility`
--
ALTER TABLE `list_facility`
  ADD CONSTRAINT `list_facility_ibfk_2` FOREIGN KEY (`id_facility`) REFERENCES `facility` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_facility_ibfk_3` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `list_spot`
--
ALTER TABLE `list_spot`
  ADD CONSTRAINT `list_spot_ibfk_1` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `list_spot_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`id_region`) REFERENCES `region` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `locations_ibfk_3` FOREIGN KEY (`id_area`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `spot`
--
ALTER TABLE `spot`
  ADD CONSTRAINT `spot_ibfk_1` FOREIGN KEY (`id_location`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `spot_ibfk_2` FOREIGN KEY (`id_label`) REFERENCES `label_spot` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
