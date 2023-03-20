{
    'name': "Weather Notification",
    'version': "16.0.1",
    'category': "Website",
    'sequence': 60,
    'summary': 'Weather Notification',

    'depends': [
        'website', 'base'
     ],
    'data': [
        'views/api.xml'
    ],
    'assets': {
        'web.assets_backend': [
            '/weather_notification/static/src/js/weather.js',
            '/weather_notification/static/src/xml/weather.xml'
           ],

            },
    'installable': True,
}
