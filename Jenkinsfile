pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = credentials('aws-account-id') // Ensure this credential exists in Jenkins
        AWS_DEFAULT_REGION = 'us-east-1'
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        FRONTEND_REPO = "frontend-repo"
        BACKEND_REPO = "backend-repo"
        PATH = "/usr/local/bin:/usr/local/sbin:/opt/homebrew/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ushanvidu/myproject_devops.git'
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                    sh 'terraform plan -out=tfplan'
                    // In a real pipeline, you might want a manual approval step here
                    // input message: 'Apply Terraform?', ok: 'Yes'
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker compose build"
                }
            }
        }

        stage('Tag Images for ECR') {
            steps {
                script {
                    sh """
                    docker tag frontend:latest ${ECR_REGISTRY}/${FRONTEND_REPO}:latest
                    docker tag backend:latest ${ECR_REGISTRY}/${BACKEND_REPO}:latest
                    """
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                script {
                    sh """
                    docker push ${ECR_REGISTRY}/${FRONTEND_REPO}:latest
                    docker push ${ECR_REGISTRY}/${BACKEND_REPO}:latest
                    """
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