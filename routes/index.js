//Global route handling
module.exports = (app, nodemailer, path, fetch, keys, exphbs) => {

    //Home Route
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.get('/index.html', (req, res) => {
        res.render('home');
    });

    //Calc Route
    app.get('/calc', (req, res) => {
        res.render('calc');
    });

    //Pricelist route
    app.get('/price-list', (req, res) => {
        res.render('price-list');
    });

    //Reports route
    app.get('/prod-reports', (req, res) => {
        res.render('prod-reports');
    });

    //Location Pars route
    app.get('/location-pars', (req, res) => {
        res.sendFile(locationPars);
    });

    //Send prictable.csv
    app.get('/getPriceTable', (req, res) => {
        console.log('API hit...');
        res.sendFile(priceTable);
    })

    app.post('/getGeoWeather', (req, res) => {
        let lat = 40.0519037;
        let lon = -74.1768297;
        // let lat = req.body.coords.latitude;
        // let lon = req.body.coors.logitude;
        const APIKey = keys.weatherAPI;
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${APIKey}`)
            .then(response => response.json())
            .then(data => res.send(data))
            .catch(err => console.log(err));
        console.log('Weather Sent...');
    })

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: "joseph@oceanhomehealth.com",
            pass: keys.emailPass
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
    app.post('/emailContactForm', (req, res) => {
        console.log(req.body);
        let mailOptions = {
            from: `<joseph@oceanhomehealth.com>`,
            to: '<joseph@oceanhomehealth.com>',
            subject: `${req.body.name} - ${req.body.subject}`,
            html: `${req.body.body}</br>${req.body.name}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log(`Message Sent: ${info.response}`);
        })
        res.send('Email Sent...')
    })
}