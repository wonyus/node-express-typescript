/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'wonyus/node-emqx'
        DOCKER_REGISTRY_CREDENTIALS = 'docker-credential'
        DOCKER_REGISTRY_URL = 'https://registry.hub.docker.com'
        DEPLOYMENT_FILE = '.kube/deployment.yaml'
        DEPLOYMENT_NAME = 'linked-server'
        NAME_SPACE = 'middleware'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    buildDockerImage("${env.GIT_COMMIT}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    withDockerRegistry(url: "${DOCKER_REGISTRY_URL}", credentialsId: "${DOCKER_REGISTRY_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE_NAME}:${env.GIT_COMMIT}").push()
                        docker.image("${DOCKER_IMAGE_NAME}:latest").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh "kubectl delete deployment ${DEPLOYMENT_NAME} -n ${NAME_SPACE}"
                sh "kubectl apply -f ${DEPLOYMENT_FILE}"
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}

/* groovylint-disable-next-line FactoryMethodName, MethodParameterTypeRequired, MethodReturnTypeRequired, NoDef */
def buildDockerImage(tag) {
    sh "docker build -t ${DOCKER_IMAGE_NAME}:${tag} -t ${DOCKER_IMAGE_NAME}:latest ."
}
