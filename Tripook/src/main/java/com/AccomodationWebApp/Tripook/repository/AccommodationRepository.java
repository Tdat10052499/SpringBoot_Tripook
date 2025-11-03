package com.AccomodationWebApp.Tripook.repository;

import com.AccomodationWebApp.Tripook.entity.Accommodation;
import com.AccomodationWebApp.Tripook.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    
    Page<Accommodation> findByAvailableTrue(Pageable pageable);
    
    Page<Accommodation> findByUser(User user, Pageable pageable);
    
    List<Accommodation> findByUserAndAvailableTrue(User user);
    
    @Query("SELECT a FROM Accommodation a WHERE a.available = true AND " +
           "(:city IS NULL OR LOWER(a.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
           "(:type IS NULL OR a.type = :type) AND " +
           "(:minPrice IS NULL OR a.pricePerNight >= :minPrice) AND " +
           "(:maxPrice IS NULL OR a.pricePerNight <= :maxPrice) AND " +
           "(:maxGuests IS NULL OR a.maxGuests >= :maxGuests)")
    Page<Accommodation> findAccommodationsWithFilters(
        @Param("city") String city,
        @Param("type") Accommodation.AccommodationType type,
        @Param("minPrice") BigDecimal minPrice,
        @Param("maxPrice") BigDecimal maxPrice,
        @Param("maxGuests") Integer maxGuests,
        Pageable pageable
    );
    
    @Query("SELECT a FROM Accommodation a WHERE a.available = true AND " +
           "(:latitude IS NOT NULL AND :longitude IS NOT NULL AND " +
           "6371 * ACOS(COS(RADIANS(:latitude)) * COS(RADIANS(a.latitude)) * " +
           "COS(RADIANS(a.longitude) - RADIANS(:longitude)) + " +
           "SIN(RADIANS(:latitude)) * SIN(RADIANS(a.latitude))) <= :radius)")
    List<Accommodation> findAccommodationsWithinRadius(
        @Param("latitude") Double latitude,
        @Param("longitude") Double longitude,
        @Param("radius") Double radius
    );
}