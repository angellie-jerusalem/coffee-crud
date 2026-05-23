CREATE DATABASE IF NOT EXISTS coffee_shop;
USE coffee_shop;

CREATE TABLE IF NOT EXISTS menu_items (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    category    VARCHAR(50)     NOT NULL,
    price       DECIMAL(10, 2)  NOT NULL,
    description TEXT,
    available   TINYINT(1)      DEFAULT 1,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menu_items (name, category, price, description, available) VALUES 
('Barako Espresso', 'Coffee', 89.00, 'Strong & bold native Barako beans from Batangas.', 1),
('Kapeng Tagalog', 'Coffee', 75.00, 'Classic Filipino black coffee, simple & strong.', 1),
('Tsokolate Eh', 'Non-Coffee', 110.00, 'Thick Filipino hot chocolate made with tablea.', 1),
('Salabat Ginger Tea', 'Non-Coffee', 85.00, 'Warm ginger tea with honey, great for the cold.', 1),
('Buko Pandan Shake', 'Non-Coffee', 120.00, 'Refreshing young coconut & pandan shake.', 1),
('Sago''t Gulaman', 'Non-Coffee', 65.00, 'Classic Filipino drink with sago, gulaman & syrup.', 1),
('Ensaymada', 'Pastry', 75.00, 'Soft Filipino brioche topped with butter & cheese.', 1),
('Pan de Coco', 'Pastry', 45.00, 'Sweet coconut-filled bread roll.', 1),
('Ube Pandesal', 'Pastry', 35.00, 'Classic pandesal with ube filling.', 1),
('Bibingka Slice', 'Pastry', 95.00, 'Traditional rice cake with salted egg & cheese.', 1),
('Puto Cheese', 'Pastry', 55.00, 'Steamed rice cake topped with quick melt cheese.', 1);