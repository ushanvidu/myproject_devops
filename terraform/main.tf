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

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

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
  instance_type = "t3.micro"
  key_name      = "my-key-pair"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  # Boot script: Installs Docker and creates the compose file
  user_data = <<-EOF
              #!/bin/bash
              # Update and Install Docker
              sudo apt-get update -y
              sudo apt-get install -y docker.io docker-compose
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu

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
              EOF

  tags = {
    Name = "Jenkins-MERN-App"
  }

  # AUTOMATION: Connects to the server and starts the app
  provisioner "remote-exec" {
    inline = [
      "echo 'Waiting for cloud-init to finish...'",
      # Wait loop: Ensures Docker is fully installed before running commands
      "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do sleep 2; done",

      "echo 'Starting Application...'",
      "cd /home/ubuntu",
      # Pull latest images and force restart
      "sudo docker-compose pull",
      "sudo docker-compose up -d"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("./my-key-pair.pem") # Uses the key copied by Jenkins
      host        = self.public_ip
    }
  }
}

output "public_ip" {
  value = aws_instance.app_server.public_ip
}