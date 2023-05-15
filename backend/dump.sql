CREATE TABLE products 
( 
	code bigint PRIMARY KEY, # CODIGO DO PRODUTO 
	name varchar(100) NOT NULL, # NOME DO PRODUTO
	cost_price decimal(9,2) NOT NULL, # CUSTO DO PRODUTO
	sales_price decimal(9,2) NOT NULL # PRE�O DE VENDA DO PRODUTO
);

CREATE TABLE packs 
(
  id bigint AUTO_INCREMENT PRIMARY KEY, # id primario da tabela
  pack_id bigint NOT NULL,  # id do produto pack 
  product_id bigint NOT NULL, # id do produto componente
  qty bigint NOT NULL, # quantidade do produto componente no pack
  CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
  CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
);