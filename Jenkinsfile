pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'ushanvidu'
        
        // AWS Credentials are auto-injected for Terraform
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')

        PATH = "/usr/local/bin:/usr/local/sbin:/opt/homebrew/bin:$PATH"
        FRONTEND_IMAGE = "frontend"
        BACKEND_IMAGE = "backend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ushanvidu/myproject_devops.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                // Builds images using docker-compose.yml
                sh "docker compose build"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Log in to Docker Hub
                sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"

                // Tag and Push Frontend & Backend
                sh """
                docker tag ${FRONTEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest
                docker tag ${BACKEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest

                docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest
                docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest
                """
            }
        }

        stage('Deploy with Terraform') {
            steps {
                dir('terraform') {
                    // Initialize Terraform
                    sh 'terraform init'

                    // Apply changes (Creating EC2)
                    // We pass the docker username so the EC2 knows which image to pull
                    sh "terraform apply -auto-approve -var='docker_username=${DOCKERHUB_USERNAME}'"
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // 1. Log out to secure credentials
                    sh 'docker logout'

                    // 2. Prune docker system to save space on the Jenkins agent
                    // -a: Remove all unused images not just dangling ones
                    // -f: Force bypass confirmation
                    // || true: Ensures the pipeline says "Success" even if there is nothing to delete
                    sh 'docker system prune -af || true'
                }
            }
        }
    }
}