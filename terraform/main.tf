provider "aws" {
  region = "us-east-1"
}

variable "docker_username" {
  type    = string
  default = "ushanvidu"
}

# 1. Security Group
resource "aws_security_group" "app_sg" {
  name        = "mern-app-sg"
  description = "Allow Web and SSH traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Frontend Port
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend Port (8000 matches your user_data)
  ingress {
    from_port   = 8000
    to_port     = 8000
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
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 (us-east-1)
  instance_type = "t2.micro"
  key_name      = "my-key-pair" # MAKE SURE THIS EXISTS IN AWS CONSOLE

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu

              # Install Docker Compose Plugin
              sudo apt-get install -y docker-compose-plugin

              # Create docker-compose.yml
              cat <<EOT >> /home/ubuntu/docker-compose.yml
              version: '3.8'
              services:
                backend:
                  image: ${var.docker_username}/backend:latest
                  ports:
                    - "8000:8000"
                  restart: always
                  environment:
                    - PORT=8000
                    - MONGO_URL=mongodb+srv://ushanviduranga:Ananda%402002@cluster0.cq7gwxi.mongodb.net/DevOps

                frontend:
                  image: ${var.docker_username}/frontend:latest
                  ports:
                    - "80:5173"
                  depends_on:
                    - backend
                  restart: always
              EOT

              # Run the app
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