@Library('ystv-jenkins')

def imageTag = ''
pipeline {
  agent {
    node {
      label 'docker && ramdisk'
      customWorkspace '/mnt/ramdisk/build/workspace/public-site'
    }
  }

  environment {
    DOCKER_BUILDKIT = "1"
  }

  stages {
    stage('Prepare') {
      steps {
        ciSkip action: 'check'
        script {
          def imageNamePrefix = ''
          if (env.BRANCH_NAME != 'main') {
            imageNamePrefix = "${env.BRANCH_NAME}-"
          }
          imageTag = "${imageNamePrefix.replace('/', '--')}${env.BUILD_NUMBER}"
        }
      }
    }
    stage('Build Images') {
      steps {
        script {
          String deployEnv = env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ ? 'prod' : 'dev'
          def secrets = [
            [path: "ci/public-site-${deployEnv}", secretValues: [
              [envVar: 'NEXT_PUBLIC_INTERNAL_SITE', vaultKey: 'internal-site'],
              [envVar: 'NEXT_PUBLIC_REST_API', vaultKey: 'web-api-endpoint']
            ]]
          ]
          withVault([configuration: vaultConfig, vaultSecrets: secrets]) {
            sh """docker build \\
              --build-arg GIT_REV_ARG=${env.GIT_COMMIT} \
              --build-arg BUILD_ID_ARG=${JOB_NAME}:${BUILD_ID} \
              --build-arg NEXT_PUBLIC_INTERNAL_SITE_ARG=${NEXT_PUBLIC_INTERNAL_SITE} \
              --build-arg NEXT_PUBLIC_REST_API_ARG=${NEXT_PUBLIC_REST_API} \
              -t registry.comp.ystv.co.uk/ystv/public-site:${imageTag}\\
              .
            """
          }
      }
    }

    stage('Push') {
      when {
        anyOf {
          branch 'main'
          tag 'v*'
          changeRequest target: 'main'
        }
      }
      steps {
        dockerPush image: 'registry.comp.ystv.co.uk/ystv/public-site', tag: imageTag
      }
    }

    stage('Deploy preview') {
      when {
        changeRequest target: 'main'
      }
      steps {
        deployPreview action: 'deploy', job: 'public-site-preview', urlSuffix: 'public.dev.ystv.co.uk'
      }
    }

    stage('Deploy to development') {
      when {
        branch 'main'
      }
      steps {
        build job: 'Deploy Nomad Job', parameters: [
          string(name: 'JOB_FILE', value: 'public-site-dev.nomad'),
          text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/public-site:${imageTag}")
        ], wait: true
        deployPreview action: 'cleanup'
        deployPreview action: 'cleanupMerge'
        //sh "nomad alloc exec -task public-site-dev -job public-site-dev npx -y prisma migrate deploy --schema lib/db/schema.prisma"
      }
    }

    stage('Deploy to production') {
      when {
        // Only build tags that look like v1.2.3 with no suffix (eg v1.2.3-beta.1 won't be built)
        tag(pattern: /^v\d+\.\d+\.\d+$/, comparator: "REGEXP")
      }
      steps {
        build job: 'Deploy Nomad Job', parameters: [
          string(name: 'JOB_FILE', value: 'public-site-prod.nomad'),
          text(name: 'TAG_REPLACEMENTS', value: "registry.comp.ystv.co.uk/ystv/public-site:${imageTag}")
        ], wait: true
        //sh "nomad alloc exec -task public-site-prod -job public-site-prod npx -y prisma migrate deploy --schema lib/db/schema.prisma"
      }
    }
  }

  post {
    always {
      ciSkip action: 'postProcess'
      cleanWs()
    }
  }
}
