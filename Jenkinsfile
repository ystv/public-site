String registryEndpoint = 'registry.comp.ystv.co.uk'

// def vaultConfig = [vaultUrl: 'https://vault.comp.ystv.co.uk',
//                   vaultCredentialId: 'jenkins-vault',
//                   engineVersion: 2]

def image
String imageName = "ystv/public-site:${env.BRANCH_NAME}-${env.BUILD_ID}"

// Checking if it is semantic version release.
// String deployEnv = env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ ? 'prod' : 'dev'

pipeline {
  agent {
    label 'docker'
  }

  environment {
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Build image') {
      steps {
        script {
            docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
              image = docker.build(imageName, """ \
                  --build-arg GIT_REV=${env.GIT_COMMIT} \
                  --build-arg BUILD_ID=${JOB_NAME}:${BUILD_ID} \
                  -f Dockerfile . \
                """)
          }
        }
      }
    }

    stage('Push image to registry') {
      steps {
        script {
          docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
            image.push()
            if (env.BRANCH_IS_PRIMARY) {
              image.push('latest')
            }
          }
        }
      }
    }

    stage('Deploy') {
//       when {
//         anyOf {
//           expression { env.BRANCH_IS_PRIMARY }
//           equals(actual: deployEnv, expected: 'prod')
//         }
//       }
//
//       steps {
//         build(job: 'Deploy Nomad Job', parameters: [
//           string(name: 'JOB_FILE', value: "public-site-${deployEnv}.nomad"),
//           text(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
//         ])
//       }


      stages {
        stage('Development') {
          when {
            expression { env.BRANCH_IS_PRIMARY }
          }
          steps {
            build(job: 'Deploy Nomad Job', parameters: [
              string(name: 'JOB_FILE', value: 'public-site-dev.nomad'),
              text(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
            ])
          }
        }

        stage('Production') {
          when {
            // Checking if it is semantic version release.
            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ }
          }
          steps {
            build(job: 'Deploy Nomad Job', parameters: [
              string(name: 'JOB_FILE', value: 'public-site-prod.nomad'),
              text(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
            ])
          }
        }
      }
    }
  }
}
