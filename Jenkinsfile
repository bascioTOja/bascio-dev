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
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'echo TODO:Deploy'
      }
    }
  }
}
