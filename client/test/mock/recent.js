//http://katyapushkareva.blogspot.com/feeds/posts/default?max-results=6&alt=json
var recentMocks =
    [
      {
        method: 'GET',
        url: 'recent/works',
        result: {
          'status': {
            'code': 200,
            'name': 'OK'
          },
          'result': [
            {
              'title': 'Fast sketches',
              'image': 'sketches10012013_1_XqGaWB.jpg'
            },
            {
              'title': 'Faces',
              'image': 'sketches10012013_3_OXxKEj.jpg'
            },
            {
              'title': 'Fast sketches',
              'image': 'sketches10012013_2_qxtJru.jpg'
            },
            {
              'title': 'Thailand Ao Nang Rock',
              'image': 'aoNang_uBBqSL.jpg'
            },
            {
              'title': 'Thailand Krabi Mountain',
              'image': 'thai_krabi_wuWffr.jpg'
            },
            {
              'title': 'Girl',
              'image': 'girl_EoGXqs.jpg'
            }
          ],
          'error': {}
        }
      },
      {
        method: 'GET',
        url: 'recent/posts',
        result: {
          'status': {
            'code': 200,
            'name': 'OK'
          },
          'result': [
            {
              href: "http://katyapushkareva.blogspot.com/2013/07/graduation.html",
              title: "Graduation"
            }
            ,
            {
              href: "http://katyapushkareva.blogspot.com/2013/07/6-12.html",
              title: "6-12 недели"
            },
            {
              href: "http://katyapushkareva.blogspot.com/2013/02/345.html",
              title: "3,4,5 недели"
            },
            {
              href: "http://katyapushkareva.blogspot.com/2013/01/2.html",
              title: "2я неделя"
            },
            {
              href: "http://katyapushkareva.blogspot.com/2013/01/1.html",
              title: "1я неделя."
            },
            {
              href: "http://katyapushkareva.blogspot.com/2013/01/6.html",
              title: "6й семестр!"
            }
          ],
          'error': {}
        }
      }
    ];