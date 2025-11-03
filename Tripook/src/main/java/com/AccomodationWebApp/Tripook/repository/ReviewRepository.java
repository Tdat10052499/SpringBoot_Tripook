package com.AccomodationWebApp.Tripook.repository;

import com.AccomodationWebApp.Tripook.entity.Review;
import com.AccomodationWebApp.Tripook.entity.User;
import com.AccomodationWebApp.Tripook.entity.Accommodation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    Page<Review> findByAccommodation(Accommodation accommodation, Pageable pageable);
    
    Page<Review> findByUser(User user, Pageable pageable);
    
    Optional<Review> findByUserAndAccommodation(User user, Accommodation accommodation);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.accommodation = :accommodation")
    Double getAverageRatingByAccommodation(@Param("accommodation") Accommodation accommodation);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.accommodation = :accommodation")
    Long countReviewsByAccommodation(@Param("accommodation") Accommodation accommodation);
}