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
            environment {
                APP_ENV = credentials('publicsite-staging-env')
            }
            steps {
                sh "docker build --build-arg SOURCE_ID_ARG=$GIT_COMMIT --build-arg BUILD_ID_ARG=$BUILD_ID -t $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID ."
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
                            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ }
                        }
                    }
                    environment {
                        TARGET_SERVER = credentials('staging-server-address')
                        APP_ENV = credentials('publicsite-staging-env')
                    }
                    steps {
                        sshagent(credentials : ['staging-server-key']) {
                            script {
                                sh '''ssh -tt deploy@$TARGET_SERVER << EOF
                                    docker pull $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID
                                    docker rm -f ystv-public-site
                                    docker run -d -p 1337:3000 --name ystv-public-site $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID
                                    exit 0
                                EOF'''
                            }
                        }
                    }
                }
                stage('Production') {
                    when {
                        expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
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
                                    docker run -d -p 1337:3000 --name ystv-public-site $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID
                                    exit 0
                                EOF'''
                            }
                        }
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker image prune -a -f --filter "label=site=public"' // remove old image
            }
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
