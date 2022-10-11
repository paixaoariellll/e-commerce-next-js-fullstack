import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Administrador',
            lastName: 'Local',
            email: 'admingameon@example.com',
            password: bcrypt.hashSync('GameOn2022!'),
            isAdmin: true,
        },
        {
            name: 'Administrador',
            lastName: 'Online',
            email: 'admin2@example.com',
            password: bcrypt.hashSync('GameOn2022!'),
            isAdmin: true,
        },
        {
            name: 'Usuário',
            lastName: 'Local',
            email: 'user@example.com',
            password: bcrypt.hashSync('GameOn2022!'),
            isAdmin: false,
        },
        {
            name: 'Usuário',
            lastName: 'Online',
            email: 'user2@example.com',
            password: bcrypt.hashSync('GameOn2022!'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Halo Infinite',
            image: '/img/game (1).jpg',
            slug: 'halo-infinite',
            category: "Xbox",
            price: 250.00,
            description: 'O lendário super soldado retorna em Halo Infinite. A 343 Industries e a Microsoft estão construindo o maior e mais visualmente espetacular Halo até agora. Halo Infinite estreia na família de consoles Xbox, incluindo o Xbox Series X, o console de jogos mais recente e poderoso da Microsoft. Para aproveitar ao máximo sua prodigiosa proeza gráfica, a 343 Industries construiu um mecanismo de jogo totalmente novo e de última geração, dando a seus artistas de classe mundial as ferramentas e a tecnologia para realizar os mundos, a guerra e a maravilha do universo Halo em um estilo sem precedentes e fidelidade. A 343 Industries deu à Dark Horse acesso à arte e aos artistas que trouxeram Halo Infinite à vida vibrante e vívida. Está tudo aqui em detalhes incomparáveis, os heróis que você aprendeu a amar - o Master Chief, os bravos soldados da UNSC, bem como as armas, veículos, vilões e vistas - e, claro, os ambientes homônimos e magníficos do próprio Halo.',
            rating: 4.5,
            numReviews: 10,
            countInStock: 1,
            publisher: '343 e Microsoft',
            genero: "Ação"
        },
        {
            name: 'Game 2',
            image: '/img/game (2).jpeg',
            slug: 'Game-02',
            category: "Xbox",
            price: 300.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 5,
            publisher: 'Nintendo'
        },
        {
            name: 'Game 3',
            image: '/img/game (3).jpeg',
            slug: 'Game-03',
            category: "PlayStation",
            price: 200.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 7,
            publisher: 'Eletronic Arts'
        },
        {
            name: 'Game 4',
            image: '/img/game (4).jpeg',
            slug: 'Game-04',
            category: "PlayStation",
            price: 190.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Rockstar Games'
        },
        {
            name: 'Game 5',
            image: '/img/game (5).jpeg',
            slug: 'Game-05',
            category: "Xbox",
            price: 160.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 2,
            publisher: 'Rockstar Games'
        },
        {
            name: 'Game 6',
            image: '/img/game (6).jpeg',
            slug: 'Game-06',
            category: "Xbox",
            price: 150.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 8,
            publisher: 'Sony'
        },
        {
            name: 'Game 7',
            image: '/img/game (7).jpeg',
            slug: 'Game-07',
            category: "Xbox",
            price: 140.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 0,
            publisher: 'Eletronic Arts'
        },
        {
            name: 'Game 8',
            image: '/img/game (8).jpeg',
            slug: 'Game-08',
            category: "Xbox",
            price: 160.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 0,
            publisher: 'Eletronic Arts'
        },
        {
            name: 'Game 9',
            image: '/img/game (9).jpeg',
            slug: 'Game-09',
            category: "Xbox",
            price: 120.00,
            description: 'É um Game incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 1,
            publisher: 'Eletronic Arts'
        },
    ],
}

export default data
