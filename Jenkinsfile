pipeline {
    agent any

    environment {
        REGISTRY_ENDPOINT = credentials('docker-registry-endpoint')
        APP_ENV = credentials('publicsite-staging-env')
    }

    stages {
        stage('Update Components') {
            steps {
                sh "docker pull node:alpine"
            }
        }
        stage('Build') {
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
                        TARGET_PATH = credentials('staging-server-path')
                    }
                    steps {
                        sh "cp $APP_ENV .env.local"
                        sh "docker build --build-arg SOURCE_ID_ARG=$GIT_COMMIT --build-arg BUILD_ID_ARG=$BUILD_ID -t $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID ."
                    }
                }
                stage('Production') {
                    when {
                        expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
                    }
                    environment {
                        TARGET_SERVER = credentials('prod-server-address')
                        APP_ENV = credentials('publicsite-production-env')
                        TARGET_PATH = credentials('staging-server-path')
                    }
                    steps {
                        sh "cp $APP_ENV .env.local"
                        sh "docker build --build-arg SOURCE_ID_ARG=$GIT_COMMIT --build-arg BUILD_ID_ARG=$BUILD_ID -t $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID ."
                    }
                }
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
                        TARGET_PATH = credentials('staging-server-path')
                    }
                    steps {
                        sshagent(credentials : ['staging-server-key']) {
                            script {
                                sh 'rsync -av $APP_ENV deploy@$TARGET_SERVER:$TARGET_PATH/public-site/.env'
                                sh '''ssh -tt deploy@$TARGET_SERVER << EOF
                                    docker pull $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID
                                    docker rm -f ystv-public-site
                                    docker run -d -p 1337:3000 --env-file $TARGET_PATH/public-site/.env --name ystv-public-site $REGISTRY_ENDPOINT/ystv/public-site:$BUILD_ID
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
                        APP_ENV = credentials('publicsite-production-env')
                        TARGET_PATH = credentials('staging-server-path')
                    }
                    steps {
                        sshagent(credentials : ['prod-server-key']) {
                            script {
                                sh 'rsync -av $APP_ENV deploy@$TARGET_SERVER:$TARGET_PATH/public-site/.env'
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
