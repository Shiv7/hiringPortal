package com.shramii.controller;

import com.shramii.model.Job;
import com.shramii.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public ResponseEntity<?> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "postedAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String search) {

        try {
            Sort sort = sortDir.equalsIgnoreCase("desc") ?
                    Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

            Pageable pageable = PageRequest.of(page, size, sort);
            Page<Job> jobs;

            if (search != null && !search.isEmpty()) {
                jobs = jobRepository.findByTitleContainingIgnoreCase(search, pageable);
            } else if (location != null && !location.isEmpty()) {
                jobs = jobRepository.findByLocationContainingIgnoreCase(location, pageable);
            } else if (jobType != null && !jobType.isEmpty()) {
                jobs = jobRepository.findByJobType(Job.JobType.valueOf(jobType), pageable);
            } else {
                jobs = jobRepository.findByStatus(Job.Status.ACTIVE, pageable);
            }

            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching jobs: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable String id) {
        try {
            Optional<Job> job = jobRepository.findById(id);
            if (job.isPresent()) {
                Job jobEntity = job.get();
                jobEntity.setViews(jobEntity.getViews() + 1);
                jobRepository.save(jobEntity);
                return ResponseEntity.ok(jobEntity);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching job: " + e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> createJob(@RequestBody Job job) {
        try {
            job.setPostedAt(new Date());
            job.setStatus(Job.Status.ACTIVE);
            job.setViews(0);
            job.setApplications(0);

            Job savedJob = jobRepository.save(job);
            return ResponseEntity.ok(savedJob);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating job: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> updateJob(@PathVariable String id, @RequestBody Job jobDetails) {
        try {
            Optional<Job> jobOptional = jobRepository.findById(id);
            if (jobOptional.isPresent()) {
                Job job = jobOptional.get();

                // Update fields
                job.setTitle(jobDetails.getTitle());
                job.setDescription(jobDetails.getDescription());
                job.setLocation(jobDetails.getLocation());
                job.setJobType(jobDetails.getJobType());
                job.setMinSalary(jobDetails.getMinSalary());
                job.setMaxSalary(jobDetails.getMaxSalary());
                job.setSkills(jobDetails.getSkills());
                job.setExperience(jobDetails.getExperience());
                job.setEducation(jobDetails.getEducation());
                job.setBenefits(jobDetails.getBenefits());
                job.setContactEmail(jobDetails.getContactEmail());
                job.setContactPhone(jobDetails.getContactPhone());
                job.setDeadline(jobDetails.getDeadline());

                Job updatedJob = jobRepository.save(job);
                return ResponseEntity.ok(updatedJob);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating job: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> deleteJob(@PathVariable String id) {
        try {
            if (jobRepository.existsById(id)) {
                jobRepository.deleteById(id);
                return ResponseEntity.ok("Job deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting job: " + e.getMessage());
        }
    }
}
