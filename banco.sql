CREATE TABLE usuarios (
id SERIAL primary key, 
nome varchar(100) not null,
sobrenome varchar(100) not null,
senha varchar (300) not null,
setor varchar(100) not null,
nome_usuario varchar(100),
cargo varchar(100) not null,
email varchar(150)not null
)

select * from usuarios; 


drop table usuarios; 

CREATE OR REPLACE FUNCTION gerar_nome_usuario()
RETURNS TRIGGER AS $$
BEGIN
    NEW.nome_usuario := LOWER(NEW.nome) || '.' || LOWER(NEW.sobrenome);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_nome_usuario
BEFORE INSERT ON usuarios
FOR EACH ROW
EXECUTE FUNCTION gerar_nome_usuario();



ALTER TABLE usuarios
ALTER COLUMN senha TYPE VARCHAR(255);

ALTER TABLE usuarios
ADD COLUMN email VARCHAR(150);

ALTER SEQUENCE usuarios_id_seq RESTART WITH 3
ALTER TABLE usuarios ADD cargo VARCHAR(100);

ALTER USER postgres WITH PASSWORD '2012'
