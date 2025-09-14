package com.shramii.repository;

import com.shramii.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsername(String username);
    
    List<User> findByRole(String role);
    
    List<User> findByLocationContainingIgnoreCase(String location);
    
    List<User> findBySkillsContaining(String skill);
    
    @Query("{'role': 'WORKER', 'isAvailable': true, 'isActive': true}")
    List<User> findAvailableWorkers();
    
    @Query("{'role': 'WORKER', 'skills': {$in: ?0}, 'isAvailable': true, 'isActive': true}")
    List<User> findWorkersBySkills(List<String> skills);
    
    @Query("{'role': 'WORKER', 'location': {$regex: ?0, $options: 'i'}, 'isAvailable': true, 'isActive': true}")
    List<User> findWorkersByLocation(String location);
    
    @Query("{'role': 'EMPLOYER', 'isActive': true}")
    List<User> findActiveEmployers();
    
    @Query("{'email': ?0, 'resetPasswordToken': ?1, 'resetPasswordExpires': {$gt: ?2}}")
    Optional<User> findByEmailAndResetPasswordToken(String email, String token, java.time.LocalDateTime now);
}
