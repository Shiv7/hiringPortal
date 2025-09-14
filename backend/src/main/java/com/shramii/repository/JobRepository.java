package com.shramii.repository;

import com.shramii.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {

    List<Job> findByEmployerId(String employerId);

    List<Job> findByStatus(Job.Status status);

    Page<Job> findByStatus(Job.Status status, Pageable pageable);

    @Query("{'status': 'ACTIVE', 'isFeatured': true}")
    List<Job> findFeaturedJobs();

    @Query("{'status': 'ACTIVE', 'location': {$regex: ?0, $options: 'i'}}")
    List<Job> findByLocationContainingIgnoreCase(String location);

    @Query("{'status': 'ACTIVE', 'requiredSkills': {$in: ?0}}")
    List<Job> findByRequiredSkillsIn(List<String> skills);

    @Query("{'status': 'ACTIVE', 'jobType': ?0}")
    List<Job> findByJobType(Job.JobType jobType);

    @Query("{'status': 'ACTIVE', 'salaryMin': {$gte: ?0}, 'salaryMax': {$lte: ?1}}")
    List<Job> findBySalaryRange(java.math.BigDecimal minSalary, java.math.BigDecimal maxSalary);

    @Query("{'status': 'ACTIVE', 'title': {$regex: ?0, $options: 'i'}}")
    List<Job> findByTitleContainingIgnoreCase(String title);

    @Query("{'status': 'ACTIVE', 'companyName': {$regex: ?0, $options: 'i'}}")
    List<Job> findByCompanyNameContainingIgnoreCase(String companyName);

    @Query("{'status': 'ACTIVE', 'isUrgent': true}")
    List<Job> findUrgentJobs();

    @Query("{'status': 'ACTIVE', 'applicationDeadline': {$gt: ?0}}")
    List<Job> findActiveJobsWithDeadlineAfter(LocalDateTime dateTime);

    @Query("{'status': 'ACTIVE', 'createdAt': {$gte: ?0}}")
    List<Job> findRecentJobs(LocalDateTime dateTime);

    @Query("{'status': 'ACTIVE', $text: {$search: ?0}}")
    List<Job> searchJobsByText(String searchText);

    @Query("{'status': 'ACTIVE', 'employerId': ?0, 'createdAt': {$gte: ?1}}")
    List<Job> findRecentJobsByEmployer(String employerId, LocalDateTime dateTime);

    @Query("{'status': 'ACTIVE', 'views': {$gte: ?0}}")
    List<Job> findPopularJobs(Integer minViews);

    long countByEmployerId(String employerId);

    long countByStatus(Job.Status status);

    long countByEmployerIdAndStatus(String employerId, Job.Status status);

    Page<Job> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Job> findByLocationContainingIgnoreCase(String location, Pageable pageable);

    Page<Job> findByJobType(Job.JobType jobType, Pageable pageable);
}
