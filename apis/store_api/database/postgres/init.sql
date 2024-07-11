--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Debian 14.12-1.pgdg120+1)
-- Dumped by pg_dump version 15.3

-- Started on 2024-06-26 03:24:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16385)
-- Name: store; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA store;


ALTER SCHEMA store OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16387)
-- Name: product; Type: TABLE; Schema: store; Owner: admin
--

CREATE TABLE store.product (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    product_type character varying(50) NOT NULL,
    trademark character varying(50) NOT NULL,
    description character varying(255) NOT NULL,
    sale_price numeric NOT NULL,
    tags character varying(100) NOT NULL,
    availability character varying(50) NOT NULL,
    reviews character varying(5) NOT NULL,
    status character varying(2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE store.product OWNER TO admin;

--
-- TOC entry 210 (class 1259 OID 16386)
-- Name: product_id_seq; Type: SEQUENCE; Schema: store; Owner: admin
--

CREATE SEQUENCE store.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE store.product_id_seq OWNER TO admin;

--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 210
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: store; Owner: admin
--

ALTER SEQUENCE store.product_id_seq OWNED BY store.product.id;


--
-- TOC entry 3191 (class 2604 OID 16390)
-- Name: product id; Type: DEFAULT; Schema: store; Owner: admin
--

ALTER TABLE ONLY store.product ALTER COLUMN id SET DEFAULT nextval('store.product_id_seq'::regclass);


--
-- TOC entry 3336 (class 0 OID 16387)
-- Dependencies: 211
-- Data for Name: product; Type: TABLE DATA; Schema: store; Owner: admin
--

COPY store.product (id, code, name, product_type, trademark, description, sale_price, tags, availability, reviews, status, created_at, updated_at) FROM stdin;
10	PROD003	Polo oscuros deportivos	Polo	Nike	Polo talla M	20.0	polo,sport,dark	in stock	4	1	2024-06-20 17:34:48.478328	2024-06-20 17:34:48.478328
1	PROD001	Polo Sport1	Polo	Adidas	Polo talla M	15	polo,sport	in stock	4	1	2024-06-19 22:38:03.65835	2024-06-19 22:38:03.65835
13		Pantalones		Adidas	Registrar	0.0	polo,sport			1	2024-06-20 21:17:02.436655	2024-06-20 21:17:02.436655
20	PROD001	Guantes	Accesorio	SinManos	Para tapar los goles que te hace la vida.	23.0	deporte, guantes	1	3	1	2024-06-20 22:35:30.854722	2024-06-20 22:35:30.854722
21	PROD002	erewrwe	Accesorio	Adidas	tetwerwer	10.0	polo,sport	1	3	1	2024-06-20 22:36:37.242912	2024-06-20 22:36:37.242912
22	PROD001	alex		Adidas	buen muchacho	0.0	polo,sport		6	1	2024-06-21 02:14:25.401244	2024-06-21 02:14:25.401244
23	PROD002	alex		Adidas	buen muchacho	0.0	polo,sport		6	1	2024-06-21 02:15:44.508376	2024-06-21 02:15:44.508376
12		Short		Adidas	cortos	0.0	polo,sport		5	1	2024-06-20 17:45:48.569556	2024-06-20 17:45:48.569556
6		alex		Adidas	golazo	0.0	polo,sport		6	1	2024-06-20 10:37:17.416985	2024-06-20 10:37:17.416985
4	PROD003	Polo oscuros deportivos	Polo	Nike	Polo talla MXX	20.0	polo,sport,dark	in stock	5	1	2024-06-20 07:29:23.641016	2024-06-20 07:29:23.641016
38	PROD005	Polo oscuros deportivos	Polo	Nike	Polo talla M4	10	polo,sport,dark	in stock	4	1	2024-06-25 02:03:17.226488	2024-06-25 02:03:17.226488
39	PROD005	Polo oscuros deportivos	Polo	Nike	Polo talla M7	20	polo,sport,dark	in stock	4	1	2024-06-25 02:04:28.181983	2024-06-25 02:04:28.181983
19	PRODNaN	Chalina	Accesorio	Dora	Para el frio	25.0	Chalina, Invierno	1	3	0	2024-06-20 22:28:36.691769	2024-06-20 22:28:36.691769
42	PROD006	mi producto	camisa	Adidas	sadsadsad	3	polo,sport	in stock	4	1	2024-06-25 05:27:14.460658	2024-06-25 05:27:14.460658
43	PROD007	Pantalon	Pantalon	Adidas	Pantalon corto Azul	250	pantalon, cortos	in stock	5	1	2024-06-25 06:22:15.171871	2024-06-25 06:22:15.171871
44	PROD008	Camisa	Camisa	Pumba	Camisa Explorador	12	camisa, casera	in stock	6	1	2024-06-25 06:27:54.418248	2024-06-25 06:27:54.418248
14		polo		Nike	mantequi	500.0	polo,sport	20	5	1	2024-06-20 21:54:06.915803	2024-06-20 21:54:06.915803
15		Medias		Pumba	Para el frio	20.0	medias, lana	30	3	1	2024-06-20 21:59:12.763951	2024-06-20 21:59:12.763951
16		Zapatos		Lazarillo	Zapatos para salir	23.0	zapatos, salir	20	3	1	2024-06-20 22:05:21.607173	2024-06-20 22:05:21.607173
17		Casaca		KFC	Para el invierno	12.0	Casaca de temporada	12	3	1	2024-06-20 22:10:54.46268	2024-06-20 22:10:54.46268
18		Zapatillas	Calzado	Super Reno	Muy confortables	20.0	Zapatilla	23	1	1	2024-06-20 22:19:19.80746	2024-06-20 22:19:19.80746
45	PROD02	Polo oscuros deportivos	Polo	Nike	Polo talla M	20	polo,sport,dark	in stock	5	1	2024-06-26 06:47:06.074302	2024-06-26 06:47:06.074302
2	PROD002	Polo oscuros deportivos	Polo	Nike	Polo talla L	20	polo,sport,dark	in stock	5	1	2024-06-25 04:55:16.760098	2024-06-25 04:55:16.760098
40	PROD005	Polo oscuros deportivos	Polo	Nike	Polo talla M7	20	polo,sport,dark	in stock	4	0	2024-06-25 02:23:15.728638	2024-06-25 02:23:15.728638
37	PROD004	Polo oscuros deportivos	Polo	Nike	Polo talla M1	20	polo,sport,dark	in stock	4	1	2024-06-25 02:02:37.245626	2024-06-25 02:02:37.245626
11	PROD002	Polo oscuros deportivos	Polo	Nike	Polo talla M	10	polo,sport,dark	in stock	5	0	2024-06-20 17:35:39.561879	2024-06-20 17:35:39.561879
8		asdasdasd		Adidas	asdasdasd	19	polo,sport			1	2024-06-20 10:40:29.704071	2024-06-20 10:40:29.704071
9		Carlos		Adidas	Segundo 2	0.0	polo,sport			1	2024-06-20 16:14:07.701024	2024-06-20 16:14:07.701024
\.


--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 210
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: store; Owner: admin
--

SELECT pg_catalog.setval('store.product_id_seq', 45, true);


--
-- TOC entry 3195 (class 2606 OID 16396)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: store; Owner: admin
--

ALTER TABLE ONLY store.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


-- Completed on 2024-06-26 03:24:21

--
-- PostgreSQL database dump complete
--

