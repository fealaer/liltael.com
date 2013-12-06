var quotesMocks = [
  {
    method: 'POST',
    url: 'api/v0/users/5260001073657b99d0000001/quotes',
    data: {
      quote: 'My name... is Neo.',
      userId: '5260001073657b99d0000001'
    },
    result: {
      "status": {
        "code": 200,
        "name": "OK"
      },
      "result": {
        "userId": "5260001073657b99d0000001",
        "quote": 'My name... is Neo.'
      },
      "error": {}
    }
  },
  {
    method: 'POST',
    url: 'api/v0/users/5260001073657b99d0000001/quotes',
    data: {
      quote: 'You ever have that feeling where you\'re not sure if you\'re awake or still dreaming?',
      userId: '5260001073657b99d0000001'
    },
    result: {
      "status": {
        "code": 200,
        "name": "OK"
      },
      "result": {
        "userId": "5260001073657b99d0000001",
        "quote": 'You ever have that feeling where you\'re not sure if you\'re awake or still dreaming?'
      },
      "error": {}
    }
  },
  {
    method: 'POST',
    url: 'api/v0/users/5260001073657b99d0000001/quotes',
    data: {
      quote: 'Choice, the problem is choice.',
      userId: '5260001073657b99d0000001'
    },
    result: {
      "status": {
        "code": 200,
        "name": "OK"
      },
      "result": {
        "userId": "5260001073657b99d0000001",
        "quote": 'Choice, the problem is choice.'
      },
      "error": {}
    }
  }
];