package com.AccomodationWebApp.Tripook.repository;

import com.AccomodationWebApp.Tripook.entity.Payment;
import com.AccomodationWebApp.Tripook.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    List<Payment> findByBooking(Booking booking);
    
    Optional<Payment> findByTransactionId(String transactionId);
    
    List<Payment> findByStatus(Payment.PaymentStatus status);
}