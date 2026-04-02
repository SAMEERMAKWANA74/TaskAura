package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String name;
    private String description;
    private String startDate;
    private String endDate;
    private String priority;
    private String status;   // Active, Pending, Completed
    private int progress;    // 0 - 100
    private List<String> tags;
    private String userId;
}
