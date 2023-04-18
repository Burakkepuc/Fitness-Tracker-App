import express from "express"
import routes from '../app/Routes/index';
import ejs from 'ejs'
import path from 'path'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);

app.use('/', routes);

app.get('/', (req, res) => {
   res.render('index', { title: 'My Website', message: 'Welcome to my website!' });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})