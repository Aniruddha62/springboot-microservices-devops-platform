package com.dept.service;

import com.dept.model.Department;
import com.dept.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public Department create(Department dept) {
        if (departmentRepository.existsByName(dept.getName())) {
            throw new RuntimeException("Department already exists: " + dept.getName());
        }
        return departmentRepository.save(dept);
    }

    public List<Department> getAll() { return departmentRepository.findAll(); }

    public Optional<Department> getById(Long id) { return departmentRepository.findById(id); }

    public Department update(Long id, Department details) {
        Department dept = departmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Department not found: " + id));
        dept.setName(details.getName());
        dept.setDescription(details.getDescription());
        dept.setManagerName(details.getManagerName());
        dept.setLocation(details.getLocation());
        return departmentRepository.save(dept);
    }

    public void delete(Long id) { departmentRepository.deleteById(id); }
}
