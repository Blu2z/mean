/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import News from '../api/news/news.model';
import Admin from '../api/admin/admin.model';
// import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

News.find({}).removeAsync()
  .then(() => {
    News.create({
      name: 'News testig APIs',
      text: 'Я уже делала обзор модных вечерних платьев 2015-2016 года, чуть позднее я его дополню осенними моделями. Сейчас же я расскажу о платьях в целом.&nbsp;<br>В холодный период дизайнеры отдали своё внимание в основном теплым моделям: вязка, длинный рукав, кожа, бархат, если вкратце — самые популярные тренды&nbsp;<br><br><strong>Теплые вязаные платья</strong>&nbsp;— это самое идеальное решение для холодной осени и зимы. Не удивительно, что дизайнеры все чаще обращаются к этой теме. Тепло, уютно и плюс очень стильно! Модели вязаных платьев есть у Trussardi, Céline, Leonard, Louis Vuitton, Chloé, , Stella McCartney и у многих других.&nbsp;<br><br><strong>Платья с рукавами «летучая мышь».</strong>&nbsp;Своего рода отголосок любви к пончо и кейпам. Замечательные,красивые силуэты! Только мне кажется,не совсем удобные в сочетании с привычной верхней одеждой. К таким моделям стоит выбирать пончо, накидки и кейпы. К тому же они как раз в тренде. Такие необычные силуэты платьев можно найти в коллекциях Valentino, Kenzo, Christopher Kane, Zuhair Murad, Chanel и Awaveawake.&nbsp;<br><br><strong>Платья с длинными рукавами</strong>&nbsp;опять-таки актуальны для холодного сезона. И я не удивляюсь, встречая такие модели практически в каждой коллекции! Посмотря на показы Miu Miu, Akris, Valentino, Veronique Branquinho, Chanel, Louis Vuitton, Givenchy, Paul &amp; Joe, Alexander McQueen, , в каждой коллекции присутствует силуэт платьев с длинными рукавами!&nbsp;<br><br><strong>Кожаные платья.</strong>&nbsp;И снова этот тренд набирает обороты! BDSM-стереотипы рушатся в головах людей буквально на глазах.И это радует!Так как я сама — страстный фанат кожи и ее удобства. Мне очень понравились модели из коллекций Trussardi, Veronique Branquinho, Mugler, Alexander McQueen, Saint Laurent и Elie Saab.&nbsp;<br><br><strong>Объемный крой и oversize.</strong>&nbsp;Один из очень приметных трендов модных платьев последних сезонов, особенно осенне-зимних. Объясняется это тем, что именно зимой хочется надевать объемные вещи, создавая или воздушную прослойку, которая согревает, или же обыгрывая oversize-тренд в стиле многослойность. Именно здесь вам подойдут предметы одежды расслабленного кроя, великоватые по размеру. Демонстрацию такого тренда можно увидеть у Valentino, Balenciaga, Kenzo, Iris van Herpen, Chloé, Chanel, Paul &amp; Joe, Leonard, Valentin Yudashkin',
      image: '/assets/images/test.jpg'
    }, {
      name: 'Андрюша',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ' +
             'odio dicta nobis, autem totam ducimus, aspernatur iusto reprehenderit ' +
             'nisi maiores incidunt aliquam accusamus, temporibus veniam nemo quis? Dolores, magni aspernatur. ',
      image: '/assets/images/test.jpg'
    }, {
      name: 'News testig APIs',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ' +
             'odio dicta nobis, autem totam ducimus, aspernatur iusto reprehenderit ' +
             'nisi maiores incidunt aliquam accusamus, temporibus veniam nemo quis? Dolores, magni aspernatur. ',
      image: '/assets/images/test.jpg'
    }, {
      name: 'News testig APIs',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ' +
             'odio dicta nobis, autem totam ducimus, aspernatur iusto reprehenderit ' +
             'nisi maiores incidunt aliquam accusamus, temporibus veniam nemo quis? Dolores, magni aspernatur. ',
      image: '/assets/images/test.jpg'
    }, {
      name: 'News testig APIs',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ' +
             'odio dicta nobis, autem totam ducimus, aspernatur iusto reprehenderit ' +
             'nisi maiores incidunt aliquam accusamus, temporibus veniam nemo quis? Dolores, magni aspernatur. ',
      image: '/assets/images/test.jpg'
    }, {
      name: 'News testig APIs',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita ' +
             'odio dicta nobis, autem totam ducimus, aspernatur iusto reprehenderit ' +
             'nisi maiores incidunt aliquam accusamus, temporibus veniam nemo quis? Dolores, magni aspernatur. ',
      image: '/assets/images/test.jpg'
    });
  });

Admin.find({}).removeAsync()
  .then(() => {
    Admin.create({
      name: 'Alexander',
      text: 'Blu2z',
      image: '/assets/images/test.jpg'
    });
  });

// User.find({}).removeAsync()
//   .then(() => {
//     User.create({
//       'url' : 'mongodb://<blu2z>:<1234>@mongo.onmodulus.net:27017/Mikha4ot' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
//     });
//   });
