-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15),
    avatar VARCHAR(500),
    role VARCHAR(20) NOT NULL DEFAULT 'GUEST',
    enabled BOOLEAN NOT NULL DEFAULT true,
    account_non_expired BOOLEAN NOT NULL DEFAULT true,
    account_non_locked BOOLEAN NOT NULL DEFAULT true,
    credentials_non_expired BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create accommodations table
CREATE TABLE accommodations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL CHECK (price_per_night >= 0),
    max_guests INTEGER NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    zip_code VARCHAR(20),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    amenities TEXT,
    house_rules TEXT,
    available BOOLEAN NOT NULL DEFAULT true,
    host_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_accommodations_host 
        FOREIGN KEY (host_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- Create accommodation_images table
CREATE TABLE accommodation_images (
    id BIGSERIAL PRIMARY KEY,
    accommodation_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(200),
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_accommodation_images_accommodation 
        FOREIGN KEY (accommodation_id) REFERENCES accommodations(id)
        ON DELETE CASCADE
);

-- Create bookings table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    accommodation_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    special_requests TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_bookings_user 
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_bookings_accommodation 
        FOREIGN KEY (accommodation_id) REFERENCES accommodations(id)
        ON DELETE CASCADE,
    CONSTRAINT chk_booking_dates 
        CHECK (check_out_date > check_in_date)
);

-- Create payments table
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    method VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    transaction_id VARCHAR(100) NOT NULL,
    gateway_response TEXT,
    paid_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payments_booking 
        FOREIGN KEY (booking_id) REFERENCES bookings(id)
        ON DELETE CASCADE
);

-- Create reviews table
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    accommodation_id BIGINT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_reviews_user 
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_reviews_accommodation 
        FOREIGN KEY (accommodation_id) REFERENCES accommodations(id)
        ON DELETE CASCADE,
    CONSTRAINT uk_reviews_user_accommodation 
        UNIQUE (user_id, accommodation_id)
);

-- Create favorites table
CREATE TABLE favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    accommodation_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_favorites_user 
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_favorites_accommodation 
        FOREIGN KEY (accommodation_id) REFERENCES accommodations(id)
        ON DELETE CASCADE,
    CONSTRAINT uk_favorites_user_accommodation 
        UNIQUE (user_id, accommodation_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_accommodations_host_id ON accommodations(host_id);
CREATE INDEX idx_accommodations_type ON accommodations(type);
CREATE INDEX idx_accommodations_city ON accommodations(city);
CREATE INDEX idx_accommodations_available ON accommodations(available);
CREATE INDEX idx_accommodations_price ON accommodations(price_per_night);
CREATE INDEX idx_accommodation_images_accommodation_id ON accommodation_images(accommodation_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_accommodation_id ON bookings(accommodation_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_reviews_accommodation_id ON reviews(accommodation_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_accommodation_id ON favorites(accommodation_id);