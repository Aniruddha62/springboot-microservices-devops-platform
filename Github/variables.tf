variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "emp-platform"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.medium"
}

variable "my_ip" {
  description = "Your IP for SSH access (format: x.x.x.x/32)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "public_key_path" {
  description = "Path to your SSH public key"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "repo_url" {
  description = "Your GitHub repo URL"
  type        = string
  default     = "https://github.com/yourusername/emp-devops-platform"
}
