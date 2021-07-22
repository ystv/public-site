pipeline {
    agent any

    environment {
        REGISTRY_ENDPOINT = credentials('docker-registry-endpoint')
    }

    stages {
        stage('Update Components') {
            steps {
                sh "docker pull node:alpine"
            }
        }
        stage('Build') {
            steps {
                sh "docker build --build-arg=SOURCE_ID_ARG=$GIT_COMMIT --build-arg=BUILD_ID_ARG=$BUILD_ID -t $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID ."
            }
        }
        stage('Registry Upload') {
            steps {
                sh "docker push $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID" // Uploaded to registry
            }
        }
        stage('Deploy') {
            stages {
                stage('Staging') {
                    when {
                        branch 'master'
                        not {
                            tag pattern: "^v(?P<major>0|[1-9]\\d*)\\.(?P<minor>0|[1-9]\\d*)\\.(?P<patch>0|[1-9]\\d*)", comparator: "REGEXP"
                        }
                    }
                    environment {
                        TARGET_SERVER = credentials('staging-server-address')
                    }
                    steps {
                        sshagent(credentials : ['staging-server-key']) {
                            script {
                                sh '''ssh -tt deploy@$TARGET_SERVER << EOF
                                    docker pull $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID
                                    docker rm -f ystv-public-site
                                    docker run -d -p 1337:3000 --name ystv-public-site $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID" // Deploying site
                                    docker image prune -a -f --filter "label=site=public"
                                    exit 0
                                EOF'''
                            }
                        }
                    }
                }
                stage('Production') {
                    when {
                        tag pattern: "^v(?P<major>0|[1-9]\\d*)\\.(?P<minor>0|[1-9]\\d*)\\.(?P<patch>0|[1-9]\\d*)", comparator: "REGEXP" // Checking if it is main semantic version release
                    }
                    environment {
                        TARGET_SERVER = credentials('prod-server-address')
                    }
                    steps {
                        sshagent(credentials : ['prod-server-key']) {
                            script {
                                sh '''ssh -tt deploy@$TARGET_SERVER << EOF
                                    docker pull $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID
                                    docker rm -f ystv-public-site
                                    docker run -d -p 1337:3000 --name ystv-public-site $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID" // Deploying site
                                    docker image prune -a -f --filter "label=site=public"
                                    exit 0
                                EOF'''
                            }
                        }
                    }
                }
            }
        }
        stage('Cleanup') {
            sh "docker image rm $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID" // Removing the local builder image
            sh 'docker image prune -a -f --filter "label=site=public"' // remove old image
        }
    }
    post {
        success {
            echo 'Very cash-money'
        }
        failure {
            echo 'That is not ideal, cheeky bugger'
        }
    }
}