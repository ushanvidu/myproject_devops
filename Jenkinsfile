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
                sh "docker compose build"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
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

                    // Apply changes using the Docker Hub username
                    sh "terraform apply -auto-approve -var='docker_username=${DOCKERHUB_USERNAME}'"
                }
            }
        }
    }

    post {
        always {
            // FIX: Wrap in 'node' to prevent "MissingContextVariableException"
            node {
                sh 'docker logout || true'
                // Be careful pruning here; don't delete the terraform state file!
                sh 'docker system prune -f'
            }
        }
    }
}