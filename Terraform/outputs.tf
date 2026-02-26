output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "app_urls" {
  description = "Application URLs"
  value = {
    frontend         = "http://${aws_instance.app_server.public_ip}:3000"
    employee_service = "http://${aws_instance.app_server.public_ip}:8081"
    department_service = "http://${aws_instance.app_server.public_ip}:8082"
    grafana          = "http://${aws_instance.app_server.public_ip}:3001"
    prometheus       = "http://${aws_instance.app_server.public_ip}:9090"
  }
}
