pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml' // asegúrate que esté en la raíz del repo
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando repositorio...'
                git branch: 'master', url: 'https://github.com/webdesigner98everyone/proyecto_Integracion_continua.git'
            }
        }

        stage('Verify Docker') {
            steps {
                echo 'Verificando que Docker funciona en el host...'
                sh 'docker --version'
                sh 'docker info'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Construyendo imágenes Docker...'
                sh "docker compose -f ${DOCKER_COMPOSE_FILE} build || exit 1"
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Levantando contenedores con Docker Compose...'
                sh "docker compose -f ${DOCKER_COMPOSE_FILE} up -d || exit 1"
            }
        }

        stage('Run Backend Tests') {
            steps {
                echo 'No hay tests por ahora, placeholder para futuras pruebas CI'
            }
        }
    }

    post {
        success {
            echo "Pipeline ejecutado correctamente 🚀"
        }
        failure {
            echo "Pipeline falló ❌"
        }
    }
}
