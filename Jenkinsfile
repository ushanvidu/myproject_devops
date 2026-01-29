pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'ushanvidu'
        
        // AWS Credentials for Terraform
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



        stage('Build Docker Images Using Compose') {
            steps {
                script {
                    sh "docker compose build"
                }
            }
        }

        stage('Tag Images') {
            steps {
                script {
                    sh """
                    docker tag ${FRONTEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest
                    docker tag ${BACKEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    sh """
                    docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest
                    docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest
                    """
                }
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    sh "terraform plan -var='docker_username=${DOCKERHUB_USERNAME}'"
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    // Auto-approve for automation; in production, you might want a manual approval step
                    sh "terraform apply -auto-approve -var='docker_username=${DOCKERHUB_USERNAME}'"
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker system prune -af'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}