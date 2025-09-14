package com.shramii.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    @GetMapping("/stats")
    public List<Map<String, String>> getStats() {
        return Arrays.asList(
                Map.of("number", "10K+", "label", "Active Workers"),
                Map.of("number", "5K+", "label", "Job Postings"),
                Map.of("number", "95%", "label", "Success Rate"),
                Map.of("number", "24/7", "label", "Support")
        );
    }

    @GetMapping("/features")
    public List<Map<String, String>> getFeatures() {
        return Arrays.asList(
                Map.of("icon", "Users", "title", "Smart Matching", "description", "AI-powered job matching connects the right workers with the right opportunities."),
                Map.of("icon", "Shield", "title", "Verified Profiles", "description", "All workers and employers are verified for safety and reliability."),
                Map.of("icon", "Zap", "title", "Quick Hiring", "description", "Streamlined process gets workers hired faster than ever before."),
                Map.of("icon", "TrendingUp", "title", "Career Growth", "description", "Track your progress and unlock new opportunities for advancement.")
        );
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return Arrays.asList(
                "Construction",
                "Manufacturing",
                "Logistics",
                "Healthcare",
                "Retail",
                "Hospitality",
                "Maintenance",
                "Security"
        );
    }
}
