
create table users(
    id serial primary key,
    email varchar(255) unique not null,
    password varchar(300) not null,
    role varchar(255) default 'USER'
);


create table basket(
    id serial primary key,
    user_id int not null,
    constraint fk_users foreign key (user_id) references "users" (id)
);


create table brands(
    id serial primary key,
    "name" varchar(255) unique not null
);


create table types(
    id serial primary key,
    "name" varchar(255) unique not null
);


create table brands_types(
    id serial primary key,
    brand_id integer not null,
    constraint fk_brands foreign key (brand_id) references "brands" (id),
    type_id integer not null,
    constraint fk_types foreign key (type_id) references "types" (id)
);


create table products(
    id serial primary key,
    "name" varchar(255) unique not null,
    description text not null,
    price DOUBLE PRECISION not null,
    img varchar(255) not null,
    brand_id int not null,
    constraint fk_brands foreign key (brand_id) references "brands" (id),
    type_id int not null,
    constraint fk_types foreign key (type_id) references "types" (id)
);


create table product_info(
    id serial primary key,
    product_id int not null,
    constraint fk_products foreign key (product_id) references "products" (id),
    title varchar(255) not null,
    description text not null
);


create table basket_product(
    id serial primary key,
    basket_id integer not null,
    constraint fk_busket foreign key (basket_id) references "basket" (id),
    product_id integer not null,
    constraint fk_products foreign key (product_id) references "products" (id)
);

