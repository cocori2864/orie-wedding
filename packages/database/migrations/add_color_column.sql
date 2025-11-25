-- Add color column
ALTER TABLE products ADD COLUMN IF NOT EXISTS color text;

-- Update initial data
UPDATE products SET color = 'White & Green' WHERE category = 'premium';
UPDATE products SET color = 'Peach & Coral' WHERE category = 'simple';
UPDATE products SET color = 'Colorful Mix' WHERE category = 'custom';
UPDATE products SET color = 'Various' WHERE category = 'etc';

-- Specific updates for better variety
UPDATE products SET color = 'Pure White' WHERE name LIKE '%White%';
UPDATE products SET color = 'Deep Red' WHERE name LIKE '%Red%';
UPDATE products SET color = 'Blue & Purple' WHERE name LIKE '%Blue%';
