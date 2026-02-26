package com.emp;

import com.emp.model.Employee;
import com.emp.repository.EmployeeRepository;
import com.emp.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void shouldCreateEmployeeSuccessfully() {
        Employee emp = Employee.builder()
            .firstName("John").lastName("Doe")
            .email("john.doe@test.com")
            .position("Developer").departmentId(1L).salary(60000.0)
            .build();

        when(employeeRepository.existsByEmail(emp.getEmail())).thenReturn(false);
        when(employeeRepository.save(emp)).thenReturn(emp);

        Employee result = employeeService.createEmployee(emp);

        assertNotNull(result);
        assertEquals("john.doe@test.com", result.getEmail());
        verify(employeeRepository, times(1)).save(emp);
    }

    @Test
    void shouldThrowExceptionWhenEmailExists() {
        Employee emp = Employee.builder().email("exists@test.com").build();
        when(employeeRepository.existsByEmail("exists@test.com")).thenReturn(true);

        assertThrows(RuntimeException.class, () -> employeeService.createEmployee(emp));
    }

    @Test
    void shouldReturnEmployeeById() {
        Employee emp = Employee.builder().id(1L).firstName("Jane").build();
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(emp));

        Optional<Employee> result = employeeService.getEmployeeById(1L);

        assertTrue(result.isPresent());
        assertEquals("Jane", result.get().getFirstName());
    }

    @Test
    void shouldDeleteEmployee() {
        when(employeeRepository.existsById(1L)).thenReturn(true);
        employeeService.deleteEmployee(1L);
        verify(employeeRepository, times(1)).deleteById(1L);
    }
}
