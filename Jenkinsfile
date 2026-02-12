pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'ushanvidu'
        SERVER_IP = 'YOUR_EC2_PUBLIC_IP'

        FRONTEND_IMAGE = "frontend"
        BACKEND_IMAGE = "backend"

        PATH = "/usr/local/bin:/usr/local/sbin:/opt/homebrew/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ushanvidu/myproject_devops.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build --platform linux/amd64 -t $FRONTEND_IMAGE:latest ./frontend'
                sh 'docker build --platform linux/amd64 -t $BACKEND_IMAGE:latest ./backend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh """
                docker tag $FRONTEND_IMAGE:latest $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:latest
                docker tag $BACKEND_IMAGE:latest $DOCKERHUB_USERNAME/$BACKEND_IMAGE:latest

                docker push $DOCKERHUB_USERNAME/$FRONTEND_IMAGE:latest
                docker push $DOCKERHUB_USERNAME/$BACKEND_IMAGE:latest
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@$SERVER_IP '
                        cd /home/ubuntu &&
                        /usr/local/bin/docker-compose pull &&
                        /usr/local/bin/docker-compose up -d --remove-orphans
                    '
                    """
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker logout'
                sh 'docker system prune -af || true'
            }
        }
    }
}
