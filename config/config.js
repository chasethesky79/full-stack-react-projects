const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || '9BecY7A6bTtYqbq97hkAwf7On+AD0LhSbeiD1nrmKyI=',
    mongoUri: 'mongodb://localhost:27017/mernproject'
}

export default config