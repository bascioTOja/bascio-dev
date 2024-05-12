pipeline {
  agent any
  stages {
    stage('Initial') {
      steps {
        echo 'Install dependencies...'
        sh 'npm ci'
      }
    }

    stage('Test') {
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
    sshPublisher(
        publishers: [
            sshPublisherDesc(
                configName: 'bascio.dev',
                transfers: [
                    sshTransfer(
                        cleanRemote: true,
                        excludes: '',
                        execCommand: '',
                        execTimeout: 120000,
                        flatten: false,
                        makeEmptyDirs: true,
                        noDefaultExcludes: false,
                        patternSeparator: '[, ]+',
                        remoteDirectory: '',
                        remoteDirectorySDF: false,
                        removePrefix: 'dist',
                        sourceFiles: 'dist/**'
                    )
                ],
                usePromotionTimestamp: false,
                useWorkspaceInPromotion: false,
                verbose: false
            )
        ]
    )
}
