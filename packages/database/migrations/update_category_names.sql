-- Update categories to match new UI structure
-- Shooting -> Simple
UPDATE products SET category = 'simple' WHERE category = 'shooting';

-- Wedding -> Premium
UPDATE products SET category = 'premium' WHERE category = 'wedding';

-- Etc remains Etc
-- Custom is currently empty
