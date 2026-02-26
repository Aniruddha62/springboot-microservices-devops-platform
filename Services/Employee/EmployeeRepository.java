package com.emp.repository;

import com.emp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDepartmentId(Long departmentId);
    Optional<Employee> findByEmail(String email);
    List<Employee> findByStatus(Employee.EmployeeStatus status);
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String first, String last);
    boolean existsByEmail(String email);
}
