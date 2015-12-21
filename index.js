var azure = require('azure-storage')

var content = 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way--in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.'

var blobService = azure.createBlobService()
var containerName = 'testcontainer'
var blobName = 'testthroughput'

var iterations = 0
const MAX_ITERATIONS = 1000000

var bootstrap = (callback) => {

  blobService.createContainerIfNotExists(containerName, (err) => {
    if (err) {
      console.log('error creating container', err)
    }
    blobService.createOrReplaceAppendBlob(containerName, blobName, (err, blob) => {
      if (err) {
        console.log('error creating blob', err)
      }
      callback()
    })
  })
}

var append = () => {
  iterations++
  blobService.appendBlockFromText(containerName, blobName, line, (err, blob) => {
    if (err) {
      console.error(err);
    }
    if (iterations < MAX_ITERATIONS) {
      queueAppend()
    }
  })
}

var queueAppend = () => {
  setTimeout(append, 100)
}

bootstrap(queueAppend)
