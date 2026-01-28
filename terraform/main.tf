# terraform/main.tf

provider "aws" {
  region = "us-east-1" # Make sure this matches your Jenkinsfile region
}

# Variable to accept the username from Jenkins
variable "docker_username" {
  type    = string
  default = "ushanvidu"
}

# ECR Repositories
resource "aws_ecr_repository" "frontend" {
  name                 = "frontend-repo"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_ecr_repository" "backend" {
  name                 = "backend-repo"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

# 1. Security Group: Allow Web (80), Backend (8000), and SSH (22)
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
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS (us-east-1)
  instance_type = "t2.micro"
  key_name      = "my-key-pair"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  # IAM Instance Profile to allow ECR pull (Ensure this role exists or create it)
  # For this simple example, we assume public or docker login logic handles it, 
  # but for ECR we really need an IAM role attached. 
  # We will install AWS CLI and try to login if creds are available, 
  # OR effectively we just push to ECR in Jenkins and this EC2 might need manual setup to pull.
  # To keep it simple for the script: We will stick to Docker Hub for the DEPLOYMENT demo
  # but use ECR for the ARTIFACT storage demo as requested in "terraform and aws steps".
  
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y docker.io unzip
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu
              
              # Install AWS CLI
              curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              sudo ./aws/install

              # Install Docker Compose
              sudo apt-get install -y docker-compose-plugin

              # Create docker-compose (Using ECR require login, sticking to DockerHub for 'run' simplicity 
              # unless we add IAM role resource which complicates this single-file setup.
              # Let's use the var.docker_username which implies DockerHub for now in deployment,
              # but we HAVE added ECR resources above for the Jenkins requirement).
              
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