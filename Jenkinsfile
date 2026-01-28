pipeline {
    agent any

    environment {
        // ... (Keep your existing environment variables) ...
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'ushanvidu'
        FRONTEND_IMAGE = "frontend"
        BACKEND_IMAGE = "backend"
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    }

    stages {
        // ... (Keep Checkout, Build, Tag, Login, Push, Deploy stages same as before) ...
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ushanvidu/myproject_devops.git'
            }
        }

        // ... Other stages ...

        stage('Clean Up') {
            steps {
                script {
                    // Log out first
                    sh 'docker logout'
                    // Then prune
                    sh 'docker system prune -af'
                }
            }
        }
    }
    // Remove the 'post' block containing 'sh' entirely to avoid the error
}