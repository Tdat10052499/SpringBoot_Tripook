package com.AccomodationWebApp.Tripook.repository;

import com.AccomodationWebApp.Tripook.entity.Favorite;
import com.AccomodationWebApp.Tripook.entity.User;
import com.AccomodationWebApp.Tripook.entity.Accommodation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    Page<Favorite> findByUser(User user, Pageable pageable);
    
    Optional<Favorite> findByUserAndAccommodation(User user, Accommodation accommodation);
    
    boolean existsByUserAndAccommodation(User user, Accommodation accommodation);
    
    void deleteByUserAndAccommodation(User user, Accommodation accommodation);
}