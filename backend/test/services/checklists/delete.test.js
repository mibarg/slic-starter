'use strict'
const proxyquire = require('proxyquire')

const { test } = require('tap')

const received = {}
const deleteHandler = proxyquire('../../../services/checklists/delete', {
  './checklist.js': {
    remove: params => {
      received.deleteParams = params
      return received
    }
  }
})

test('list handler executes checklist service', async t => {
  const event = {
    requestContext: {
      identity: {
        cognitoIdentityId: 'testUser'
      }
    },
    pathParameters: {
      id: '1234'
    }
  }

  const result = await deleteHandler.main(event)

  t.equal(received.deleteParams.listId, event.pathParameters.id)
  t.equal(
    received.deleteParams.userId,
    event.requestContext.identity.cognitoIdentityId
  )
  t.end()
})