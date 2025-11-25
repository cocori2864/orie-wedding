-- Update product images to be distinct
-- Shooting Bouquets
UPDATE products SET image = '/images/bouquet_04.jpg' WHERE name = 'Sunset Coral Bouquet';
UPDATE products SET image = '/images/bouquet_06.jpg' WHERE name = 'Wild Blue Delphinium';
UPDATE products SET image = '/images/bouquet_07.jpg' WHERE name = 'Vintage Garden Rose';
UPDATE products SET image = '/images/shooting.png' WHERE name = 'Bohemian Chic';
UPDATE products SET image = '/images/bouquet_01.png' WHERE name = 'Dramatic Red';

-- Wedding Bouquets
UPDATE products SET image = '/images/wedding.png' WHERE name = 'Pure White Peony';
UPDATE products SET image = '/images/bouquet_05.jpg' WHERE name = 'Elegant Lily of the Valley';
UPDATE products SET image = '/images/bouquet_08.jpg' WHERE name = 'Classic Rose Round';
UPDATE products SET image = '/images/bouquet_02.png' WHERE name = 'Soft Peach Juliet';
UPDATE products SET image = '/images/bouquet_03.png' WHERE name = 'Graceful Calla Lily';

-- Etc (Keep as is or update if more images available)
UPDATE products SET image = '/images/etc.png' WHERE category = 'etc';
