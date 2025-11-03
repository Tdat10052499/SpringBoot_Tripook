package com.AccomodationWebApp.Tripook.repository;

import com.AccomodationWebApp.Tripook.entity.Booking;
import com.AccomodationWebApp.Tripook.entity.User;
import com.AccomodationWebApp.Tripook.entity.Accommodation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    Page<Booking> findByUser(User user, Pageable pageable);
    
    Page<Booking> findByAccommodationUser(User host, Pageable pageable);
    
    List<Booking> findByUserAndStatus(User user, Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.accommodation = :accommodation AND " +
           "b.status IN ('CONFIRMED', 'PENDING') AND " +
           "((b.checkInDate <= :checkOut AND b.checkOutDate >= :checkIn))")
    List<Booking> findConflictingBookings(
        @Param("accommodation") Accommodation accommodation,
        @Param("checkIn") LocalDate checkIn,
        @Param("checkOut") LocalDate checkOut
    );
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.accommodation = :accommodation AND b.status = 'COMPLETED'")
    Long countCompletedBookingsByAccommodation(@Param("accommodation") Accommodation accommodation);
}