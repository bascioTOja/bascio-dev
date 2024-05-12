pipeline {
  agent any
  stages {
    stage('download dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Check linting') {
      steps {
//         sh 'npm run lint'
           sh 'echo TODO:lint'
      }
    }

    stage('Check unit:test') {
      steps {
//         sh 'npm run test:unit -- --ci --coverage'
           sh 'echo TODO:Test'
      }
    }

    stage('Build') {
      steps {
        echo 'Building project...'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying application...'
        deployApp()
      }
    }
  }

  post {
    always {
      echo 'Cleaning up...'
      sh 'rm -rf node_modules'
    }
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}

def deployApp() {
  echo 'Starting deployment...'
    sshPublisher(
        publishers: [
            sshPublisherDesc(
                configName: 'bascio.dev',
                transfers: [
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '',
                        execCommand: '',
                        execTimeout: 120000,
                        flatten: false,
                        makeEmptyDirs: false,
                        noDefaultExcludes: false,
                        patternSeparator: '[, ]+',
                        remoteDirectory: '',
                        remoteDirectorySDF: false,
                        removePrefix: '',
                        sourceFiles: 'dist/*'
                    )
                ],
                usePromotionTimestamp: false,
                useWorkspaceInPromotion: false,
                verbose: false
            )
        ]
    )
}
