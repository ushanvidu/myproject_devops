# terraform/main.tf

provider "aws" {
  region = "us-east-1" # Make sure this matches your Jenkinsfile region
}

# Variable to accept the username from Jenkins
variable "docker_username" {
  type    = string
  default = "ushanvidu"
}

# 1. Security Group: Allow Web (80), Backend (5000), and SSH (22)
resource "aws_security_group" "app_sg" {
  name        = "mern-app-sg"
  description = "Allow Web and SSH traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow backend API traffic (adjust 5000 if your node app uses a different port)
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. EC2 Instance
resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS (us-east-1). Update if using a different region.
  instance_type = "t2.micro"
  key_name      = "my-key-pair" # REPLACE with your actual AWS Key Pair name

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  # User Data script: Runs once when the instance starts
  user_data = <<-EOF
              #!/bin/bash
              # 1. Install Docker & Docker Compose
              sudo apt-get update -y
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu

              # Install Docker Compose plugin
              sudo apt-get install -y docker-compose-plugin

              # 2. Create a docker-compose.yml file on the server
              # We use the images you pushed to DockerHub
              cat <<EOT >> /home/ubuntu/docker-compose.yml
              version: '3.8'
              services:
                backend:
                  image: ${var.docker_username}/backend:latest
                  ports:
                    - "5000:5000" # Maps port 5000 on server to 5000 in container
                  restart: always

                frontend:
                  image: ${var.docker_username}/frontend:latest
                  ports:
                    - "80:5173"   # Maps port 80 (HTTP) on server to 5173 (Vite default)
                  depends_on:
                    - backend
                  restart: always
              EOT

              # 3. Start the application
              cd /home/ubuntu
              sudo docker compose up -d
              EOF

  tags = {
    Name = "Jenkins-MERN-App"
  }
}

output "public_ip" {
  value = aws_instance.app_server.public_ip
}